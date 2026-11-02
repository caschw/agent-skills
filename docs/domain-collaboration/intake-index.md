# Intake index

The runtime procedure is
[`references/intake.md`](../../skills/domain-collaboration/references/intake.md).

## Purpose

When another agent asks "what do you need?", the intake index answers it. It
lists the categories of requirements a repository places on incoming content and
links each one to its authoritative sources.

## Why point instead of copy

Requirements drift: a redesign changes image sizes, a new feature adds a required
field. Requirements are usually enforced by schemas, validators, and tests, so a copy
in a document goes stale silently. The index records only the **category** and the
**location** of the truth, so:

- value changes need no index update;
- moved or deleted sources break links, which a simple test can catch;
- new categories are rare and visible in review.

Alternatives considered:

| Approach | Problem |
| --- | --- |
| Derive from scratch each time | Requirements spread across many files are easy to miss |
| Separate requirements skill or config | Lives outside the repository that enforces it; drifts without review |
| Consolidated doc with copied values | Duplicates enforced values; stale after every redesign |
| **Index of categories with source links** | Small, reviewable, stays true; chosen |

## Contents

Use [`intake-index.template.md`](../../skills/domain-collaboration/assets/intake-index.template.md).
Each category has requirements with:

- a one-line statement;
- an enforcement level: `enforced` (code or tests reject violations), `documented`
  (written rule), or `inferred` (seen only in existing content);
- links to sources.

Plus an approvals-and-gates section, known limitations (unresolved contradictions and
gaps), and a change log with the `Approved on` date. If the owner cannot respond, the
index is written as a draft with `Approved on: pending`; silence is never approval.

Common categories (use only those your repository actually has):
Identity, Distribution, Visual assets, Copy, Privacy and data handling, Support,
Accessibility, Provenance and rights, Process and approvals.

## Initializing

Prompt your agent:

> Initialize this repository's intake index using the domain-collaboration skill.

The agent scans, in order of authority: schemas and validators, tests, validation
scripts and CI, contributor docs, existing content records, existing asset sets, and
policy or provenance docs. It then presents candidate requirements with evidence,
enforcement level, and confidence, plus any contradictions between sources.

You approve, edit, or reject each category. Only approved categories are written.

### Why the scan is agent-guided

A single deterministic scanner would need to understand every framework and
content format (web frameworks, mobile projects, desktop apps), and would still miss
rules written only in prose. An agent reading the code with a fixed list of signals
produces a good draft; your approval makes it authoritative. The skill tells the agent
to say when a category has no real source rather than invent one.

## Refreshing

> Refresh this repository's intake index.

The agent re-scans, diffs against the current index, and presents only additions,
removals, broken links, and enforcement changes. Agents also run a drift check before
an exchange if sources changed since the index's approval date.

## Protecting the index

Add a test that fails if any repository path linked from the index no longer exists.
Most repositories can do this in a few lines in their existing test framework.
