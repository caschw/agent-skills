# Domain collaboration

`domain-collaboration` lets two AI agents, each responsible for a different repository
("domain"), complete one user-authorized change that spans both, while each stays in its
own lane.

Typical uses:

- A product agent and a website agent onboard a new product onto the website.
- An app ships a release and the website needs new screenshots and feature copy.
- A website redesign needs new image sizes or descriptions from every product.
- A shared policy changes and several repositories must update consistently.

The skill defines **how** the agents talk, hand over files, verify, and finish. Your
prompt defines **what** gets done. You do not need a separate skill per kind of work.

## Contents

| Document | Read it to learn |
| --- | --- |
| [concepts.md](concepts.md) | Domains, roles, exchanges, intake indexes |
| [protocol.md](protocol.md) | Lifecycle, message types, and state rules |
| [handoffs.md](handoffs.md) | Delivering files and facts safely |
| [intake-index.md](intake-index.md) | Creating and maintaining a repository's requirement index |
| [authorization-and-safety.md](authorization-and-safety.md) | Who can authorize what, escalation, privacy and rights |
| [adoption.md](adoption.md) | Preparing a repository to take part |
| [examples.md](examples.md) | End-to-end walkthroughs |
| [host-support.md](host-support.md) | GitHub Copilot app, CLI, and other agents |
| [troubleshooting.md](troubleshooting.md) | Stalls, loops, and conflicts |

Agent runtime instructions live in
[`skills/domain-collaboration/`](../../skills/domain-collaboration/SKILL.md). These docs
explain the same behavior in more depth and are not loaded by agents automatically.

## Quick start

1. Install the skill for your agent (see the [repository README](../../README.md#install)).
2. In each repository that will receive content, create an intake index:

   > Initialize this repository's intake index using the domain-collaboration skill.

   Review and approve the categories the agent proposes.
3. Start an exchange from either side with a scoped prompt, for example in the product
   repository:

   > Work with the website agent to onboard Example App. Provide any content it asks
   > for.

4. Answer any `BLOCKED` questions. When both agents report `DONE`, review the two pull
   requests.

## Design principles

- **Generic protocol, specific prompts.** Work types are not encoded in the skill, so
  it does not drift from each repository's rules.
- **Requirements live with their enforcement.** Each repository's intake index points
  to the schemas, tests and docs that enforce its rules instead of copying values.
- **Least privilege.** Only files explicitly listed in a handoff can cross domains.
- **User authority is not delegable.** Agents can coordinate details; they cannot grant
  each other new scope or approvals.
- **Verifiable deliverables.** Every file carries a checksum and provenance; every fact
  carries a source.
