#!/usr/bin/env node
// Validates every skill in skills/ against the Agent Skills specification and this
// repository's conventions. Dependency-free; run with `node scripts/validate-skills.mjs`.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const fail = (file, message) => errors.push(`${relative(root, file)}: ${message}`);

const NAME = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ALLOWED_KEYS = new Set(['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools']);

// Minimal YAML subset parser for frontmatter: top-level scalars and one-level string maps.
function parseFrontmatter(file, text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) {
    fail(file, 'missing YAML frontmatter delimited by ---');
    return null;
  }
  const data = {};
  let currentMap = null;
  for (const [index, raw] of match[1].split(/\r?\n/).entries()) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    const nested = raw.match(/^\s{2,}([A-Za-z0-9_.-]+):\s*(.*)$/);
    if (nested && currentMap) {
      currentMap[nested[1]] = unquote(nested[2]);
      continue;
    }
    const top = raw.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!top) {
      fail(file, `frontmatter line ${index + 2} is not supported: ${raw}`);
      continue;
    }
    const [, key, value] = top;
    if (value === '') {
      currentMap = {};
      data[key] = currentMap;
    } else {
      currentMap = null;
      if (value.startsWith('[') || value.startsWith('- ')) data[key] = value;
      else data[key] = unquote(value);
    }
  }
  return { data, body: text.slice(match[0].length) };
}

function unquote(value) {
  const trimmed = value.trim();
  if (/^(['"]).*\1$/.test(trimmed)) return trimmed.slice(1, -1);
  return trimmed;
}

function checkLinks(file, text) {
  const withoutCode = text.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
  for (const [, target] of withoutCode.matchAll(/\]\(([^)\s]+)\)/g)) {
    if (/^(https?:|mailto:|#)/.test(target) || target.includes('{{')) continue;
    const path = decodeURIComponent(target.split('#')[0]);
    if (!path) continue;
    if (!existsSync(resolve(dirname(file), path))) fail(file, `broken link: ${target}`);
  }
}

function markdownFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === 'node_modules' || entry.name.startsWith('.git') ? [] : markdownFiles(full);
    return entry.name.endsWith('.md') ? [full] : [];
  });
}

const skillsDir = join(root, 'skills');
const skillNames = readdirSync(skillsDir).filter((name) => statSync(join(skillsDir, name)).isDirectory());
if (skillNames.length === 0) errors.push('skills/: no skills found');

const readme = readFileSync(join(root, 'README.md'), 'utf8');
const docsIndex = readFileSync(join(root, 'docs', 'README.md'), 'utf8');

for (const dirName of skillNames) {
  const skillDir = join(skillsDir, dirName);
  const skillFile = join(skillDir, 'SKILL.md');
  if (!existsSync(skillFile)) {
    fail(skillDir, 'missing SKILL.md');
    continue;
  }
  const text = readFileSync(skillFile, 'utf8');
  const parsed = parseFrontmatter(skillFile, text);
  if (!parsed) continue;
  const { data, body } = parsed;

  for (const key of Object.keys(data)) {
    if (!ALLOWED_KEYS.has(key)) fail(skillFile, `unknown frontmatter field "${key}"`);
  }

  const { name, description, compatibility, metadata } = data;
  if (typeof name !== 'string' || !name) fail(skillFile, 'name is required');
  else {
    if (name.length > 64) fail(skillFile, 'name exceeds 64 characters');
    if (!NAME.test(name)) fail(skillFile, 'name must be lowercase letters, digits and single hyphens');
    if (name !== dirName) fail(skillFile, `name "${name}" must match directory "${dirName}"`);
  }

  if (typeof description !== 'string' || !description) fail(skillFile, 'description is required');
  else {
    if (description.length > 1024) fail(skillFile, `description is ${description.length} characters (max 1024)`);
    if (!/\buse (when|for|this)\b/i.test(description)) fail(skillFile, 'description should say when to use the skill ("Use when ...")');
  }

  if (compatibility !== undefined && (typeof compatibility !== 'string' || compatibility.length < 1 || compatibility.length > 500)) {
    fail(skillFile, 'compatibility must be 1-500 characters');
  }
  if (metadata !== undefined) {
    if (typeof metadata !== 'object') fail(skillFile, 'metadata must be a map of string values');
    else if (metadata.version !== undefined && !/^\d+\.\d+\.\d+$/.test(metadata.version)) {
      fail(skillFile, 'metadata.version must be semantic (x.y.z)');
    }
    for (const key of Object.keys(metadata ?? {})) {
      if (key.startsWith('github-')) fail(skillFile, `install metadata "${key}" must not be committed`);
    }
  }
  if (data['allowed-tools'] !== undefined && (typeof data['allowed-tools'] !== 'string' || data['allowed-tools'].startsWith('['))) {
    fail(skillFile, 'allowed-tools must be a space-separated string');
  }

  const lines = body.split('\n').length;
  if (lines > 500) fail(skillFile, `body is ${lines} lines (keep under 500)`);
  const approxTokens = Math.ceil(body.length / 4);
  if (approxTokens > 5000) fail(skillFile, `body is ~${approxTokens} tokens (keep under 5000)`);

  if (!existsSync(join(root, 'docs', dirName, 'README.md'))) fail(skillDir, `missing docs/${dirName}/README.md`);
  if (!readme.includes(`skills/${dirName}/SKILL.md`)) fail(join(root, 'README.md'), `skills table missing ${dirName}`);
  if (!docsIndex.includes(`${dirName}/README.md`)) fail(join(root, 'docs', 'README.md'), `docs index missing ${dirName}`);
}

for (const file of markdownFiles(root)) checkLinks(file, readFileSync(file, 'utf8'));

if (errors.length) {
  console.error(`Skill validation failed (${errors.length}):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log(`Validated ${skillNames.length} skill(s): ${skillNames.join(', ')}`);
