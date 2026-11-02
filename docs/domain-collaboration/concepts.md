# Concepts

## Domain

A domain is the area one agent owns, normally one repository: a product app, a
website, a documentation site, a design system. The owning agent is the only one that
edits, commits, or opens pull requests there.

## Exchange

One bounded collaboration between exactly two domains to satisfy one user prompt. It
has an id of the form:

```text
<initiator-repo>-<counterpart-repo>-<yyyymmdd>-<short-slug>
```

For example `example-app-website-20260301-onboarding`. The id appears on every message,
in the processing inbox path, and in commit or pull request descriptions so the work
can be traced.

Work spanning three or more domains is run as several two-party exchanges.

## Roles

| Role | Meaning |
| --- | --- |
| Initiator | Received the user's prompt and starts the exchange |
| Counterpart | Owns the other domain; joins via a kickoff |
| Requirements owner | Will publish or consume a deliverable, so it states the requirements |
| Supplier | Produces a deliverable from its own verified domain |

Initiator/counterpart describes who started. Requirements owner/supplier describes who
knows what. A website agent is usually the requirements owner for media and copy even
when the product agent initiated.

## Scope

The verbatim user prompt. The counterpart receives it quoted in full in the kickoff.
Both agents measure every request against it.

## Intake index

A document (default `docs/intake-index.md`) in each repository that receives content.
It lists the **categories** of requirements and links to the **sources** that define
them: schemas, validators, tests, and docs. It deliberately does not copy values, so a
redesign that changes an image size changes only the source, and the index stays true.
See [intake-index.md](intake-index.md).

## Handoff

A message listing files (by absolute path, with checksums) and facts (with sources)
that the supplier delivers. Each file has a kind:

- **asset**: copied into the receiver's repository and published or used directly;
- **informational**: read in place to answer questions or verify facts;
- **processing**: copied into the receiver's gitignored `.handoff-inbox/` for
  conversion or analysis, never committed.

See [handoffs.md](handoffs.md).

## Owner-only gates

Actions that only the human owner can authorize: merging, deploying, DNS and hosting,
permissions, releases, payments, legal and policy approvals, and anything a
repository's own instructions reserve. Agents raise these as `BLOCKED`.
