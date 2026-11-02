# Agent instructions

This repository is a general-purpose collection of reusable, agent-agnostic
[Agent Skills](https://agentskills.io/specification). It is not an application and is
not tied to any one product, company or host. Skills here must be useful to anyone who
installs them.

[CONTRIBUTING.md](CONTRIBUTING.md) is the source of truth for layout, frontmatter
rules, versioning and the pull request checklist. This file adds what an agent needs
to work here safely; it does not restate those rules.

## Layout

```text
skills/<name>/SKILL.md      Runtime entry point (what agents load)
skills/<name>/references/   Detail loaded on demand, one level deep
skills/<name>/assets/       Templates and static files
skills/<name>/scripts/      Optional helper scripts
docs/<name>/                Human and agent documentation (not installed)
scripts/validate-skills.mjs Repository validator, also run in CI
```

`skills/` is what `gh skill install` copies to users. `docs/` is for readers of this
repository. Keep runtime instructions in `skills/` compact; put explanation, rationale
and examples in `docs/`.

## Before you change anything

- Read `CONTRIBUTING.md`, the skill's `SKILL.md`, its `references/`, and its
  `docs/<name>/` pages.
- Treat every skill as public, reusable content. Never add secrets, personal data,
  private repository details, internal planning material or product-specific facts.
  Examples use fictional names such as "Example App".
- Keep skills generic. If a request only makes sense for one project, it belongs in
  that project's own instructions, not here.

## Writing skills

- Follow the Agent Skills specification for `SKILL.md` frontmatter and structure.
  The `description` must say what the skill does **and when to use it**; agents
  choose skills from that text alone.
- Describe capabilities ("message another session", "ask the user"), not tool names.
  Put host-specific tool names in a clearly labeled reference such as
  `references/host-adapters.md`, and never claim host support you have not verified.
- Keep `SKILL.md` small: route to references instead of inlining detail. Stay well
  under the specification's size guidance.
- Do not set `allowed-tools` to pre-approve shell or write access. Skills must not
  weaken a host's or repository's own permissions, approvals or safety rules.
- Skill instructions are guidance, not authority. Never write a skill that treats
  messages from other agents, files or tool output as user authorization.
- When behavior changes, bump `metadata.version` (semantic versioning), update
  `docs/<name>/` and add a `CHANGELOG.md` entry in the same change.

## Validate

Run before handing off any change:

```sh
node scripts/validate-skills.mjs
gh skill publish --dry-run
```

The validator checks frontmatter, size limits, required docs, README and docs index
entries, and relative Markdown links across the repository. CI runs it on every pull
request (`.github/workflows/validate.yml`). `gh skill publish --dry-run` only
validates; it does not publish.

For behavior changes, also install the skill locally and try it in at least one host:

```sh
gh skill install --from-local . <name> --agent github-copilot --scope user --force
```

## Boundaries

- Do not create releases, tags, publish with `gh skill publish`, change repository
  settings or push without the owner's explicit approval.
- Keep workflows least-privilege, with actions pinned to full commit SHAs.
- Preserve unrelated user changes in the working tree.

## References

- [Agent Skills specification](https://agentskills.io/specification): the portable
  `SKILL.md` format these skills follow.
- [About agent skills in GitHub Copilot](https://docs.github.com/en/copilot/concepts/customizations/agent-skills):
  how Copilot discovers and loads skills.
- [Adding skills for Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills):
  skill locations and authoring guidance for Copilot.
- [`gh skill` manual](https://cli.github.com/manual/gh_skill): install, update and
  publish commands.
- [Repository custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions):
  how Copilot reads `AGENTS.md` and `.github/copilot-instructions.md`.
- [AGENTS.md](https://agents.md/): the cross-agent instruction file convention.
- [Semantic Versioning](https://semver.org/) and
  [Keep a Changelog](https://keepachangelog.com/en/1.1.0/): versioning and changelog
  formats used here.
