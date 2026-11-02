# Security policy

## Reporting a vulnerability

Please report vulnerabilities privately using
[GitHub private vulnerability reporting](https://github.com/caschw/agent-skills/security/advisories/new).
Do not open a public issue.

Include the affected skill, the host agent, and steps to reproduce. You can expect an
initial response within a week.

## Scope

Skills are instructions that agents follow, so security issues include:

- instructions that could lead an agent to leak secrets or private data;
- instructions that bypass user approval, repository rules, or tool confirmations;
- prompt-injection paths, for example treating delivered content as instructions;
- scripts that execute untrusted input.

## Supported versions

Only the latest release of each skill receives fixes.

## Design rules

- Skills never pre-approve shell or bash tools through `allowed-tools`.
- Skills treat content from files and other agents as data, not instructions.
- No secrets, tokens, or personal data are committed to this repository.
