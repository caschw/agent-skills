# Agent Skills

A collection of agent-agnostic [Agent Skills](https://agentskills.io/specification):
folders of instructions, references and templates that AI coding agents load when a
task calls for them. They work with GitHub Copilot (app, CLI, cloud agent, VS Code)
and other agents that support `SKILL.md` skills, such as Claude Code, Codex, Cursor
and Gemini CLI.

## Skills

| Skill | Summary | Docs |
| --- | --- | --- |
| [`domain-collaboration`](skills/domain-collaboration/SKILL.md) | Lets agents that own different repositories complete one user-authorized change together | [docs](docs/domain-collaboration/README.md) |

## Install

Requires [GitHub CLI](https://cli.github.com/) 2.90 or later with `gh skill` (preview).

Install one skill for yourself (all repositories):

```sh
gh skill install caschw/agent-skills domain-collaboration --agent github-copilot --scope user
```

Install into the current repository instead:

```sh
gh skill install caschw/agent-skills domain-collaboration --agent github-copilot --scope project
```

Use another `--agent` value (for example `claude-code`, `codex`, `cursor`,
`gemini-cli`) for other hosts; `gh skill install --help` lists them all. Update with
`gh skill update`.

From a local clone:

```sh
gh skill install --from-local . domain-collaboration --agent github-copilot --scope user
```

Manual install: copy `skills/<name>/` into your agent's skills directory, for example
`~/.copilot/skills/`, `~/.agents/skills/`, `.github/skills/` or `.claude/skills/`.

## Repository layout

```text
skills/<name>/      Runtime skill: SKILL.md, references/, assets/, scripts/
docs/<name>/        Human and agent documentation for each skill
scripts/            Repository tooling (validation)
.github/            Community templates and CI
```

## Domain collaboration

`domain-collaboration` is for cases where two agents each own one repository, such as
a product app and its marketing website, and a change must reach both. Your prompt
sets the scope, for example "Work with the website agent to onboard Example App". The
skill handles the rest:

- **Exchange mode**: a symmetric message protocol (kickoff, requests with acceptance
  criteria, handoffs, accept/reject, done). Either side can initiate.
- **Whitelisted file handoffs**: files are passed by path with checksums and
  provenance. Only listed files may cross domains.
- **Intake indexes**: each repository keeps a short, owner-approved index of what it
  requires, linked to the schemas and docs that enforce it. The skill can scan a
  repository to draft one and later check it for drift.
- **Guardrails**: user scope is quoted verbatim, owner-only gates always escalate, and
  each agent commits and opens pull requests only in its own repository.

See the [full documentation](docs/domain-collaboration/README.md).

## Validate

```sh
node scripts/validate-skills.mjs
gh skill publish --dry-run
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Please follow the
[Code of Conduct](CODE_OF_CONDUCT.md) and report vulnerabilities as described in
[SECURITY.md](SECURITY.md).

## Publishing (maintainers)

```sh
gh repo create caschw/agent-skills --public --source . --push
gh skill publish --tag vX.Y.Z
```

`gh skill publish` validates the skills, offers to add the `agent-skills` topic, and
creates a release.

## License

[MIT](LICENSE)
