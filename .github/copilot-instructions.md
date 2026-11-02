# Copilot instructions

This repository is a general-purpose collection of reusable, agent-agnostic Agent
Skills, not an application. Follow [AGENTS.md](../AGENTS.md) for working rules and
[CONTRIBUTING.md](../CONTRIBUTING.md) for layout, frontmatter and versioning
requirements; do not duplicate them elsewhere.

- Skills follow the [Agent Skills specification](https://agentskills.io/specification).
  Copilot discovers them as described in
  [About agent skills](https://docs.github.com/en/copilot/concepts/customizations/agent-skills).
- Keep skills generic and public-safe. Put Copilot-specific tool names only in a
  skill's labeled host-adapter reference, never in the core `SKILL.md` workflow.
- Run `node scripts/validate-skills.mjs` and `gh skill publish --dry-run` before
  handing off. Do not publish, tag, release or push without the owner's approval.
