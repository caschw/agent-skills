# Intake mode

An **intake index** is a short document in a repository that lists the categories of
requirements this domain imposes on content it receives from other domains, and
points to the authoritative source for each. Default location:
`docs/intake-index.md`. A repository may use another path if its instruction files say
so.

The index **points, it does not copy.** Concrete values (dimensions, field names,
wording limits) live only in the schemas, validators, tests, and docs that enforce
them. That keeps the index correct when a redesign changes values.

## When to run

- "Initialize the intake index" → no index exists.
- "Refresh / drift-check the intake index" → an index exists.
- Before an exchange, if the index's sources changed after its `Approved on` date, run a
  drift check and tell the user before relying on it.

## Procedure

1. **Read the rules.** Read repository instruction files and contributing docs. Note
   any rule about what other domains may supply.
2. **Scan for signals**, highest authority first:
   1. Schemas and validators (JSON Schema, zod/yup/valibot, type definitions for content
      records, catalog loaders that reject bad data).
   2. Tests that assert fields, dimensions, file names, counts, or wording.
   3. Validation scripts and CI checks (image budgets, link checkers, linting rules).
   4. Contributor docs (`AGENTS.md`, `CONTRIBUTING.md`, `DESIGN.md`, `docs/`).
   5. Existing content records: which fields every current entry has.
   6. Existing asset sets: dimensions, light/dark and density variants, naming
      patterns, formats.
   7. Policy, provenance, licensing, and legal docs.
   Use search tools; do not execute repository code you have not reviewed. Inspect image
   dimensions with read-only tools.
3. **Draft candidates.** For each requirement record:
   - **Category** (for example Identity, Distribution, Visual assets, Copy, Privacy,
     Support, Accessibility, Provenance and rights, Process and approvals).
   - **Statement** in one line, without copying long values.
   - **Evidence**: `path:line` for every source.
   - **Enforcement**: `enforced` (code or tests reject violations), `documented`
     (written rule only), or `inferred` (pattern seen in existing content only).
   - **Confidence**: high, medium, or low.
   List **contradictions** between sources separately. Never resolve them yourself.
4. **Push back where needed.** If a category has no real source, say so and offer two
   options: document it, or derive it per exchange. Do not invent a requirement.
   `inferred` items require explicit user confirmation and should usually become
   `documented` before approval.
5. **Present for approval.** Group by category. Ask the user to approve, edit, or reject
   each category (one question per category if the host supports structured choices).
   Include counts per enforcement level so weak areas are visible.
   If the user cannot respond (for example an unattended run), do not treat silence as
   approval: write the index as a **draft pending owner approval** with
   `Approved on: pending`, and report that approval is still required.
6. **Write the index** from
   [../assets/intake-index.template.md](../assets/intake-index.template.md) with only
   approved categories. Each entry links to its sources with repository-relative links.
   Record `Approved on: <date>` and `Approved by: repository owner`. List unresolved
   contradictions and gaps under **Known limitations** instead of resolving them.
7. **Protect it.** Recommend (or add, if the prompt authorizes repository changes) a test
   or check that every linked path in the index exists, so moved sources fail loudly.
8. **Report**: approved categories, rejected or deferred items, contradictions, and
   suggested follow-ups.

## Refresh / drift check

1. Re-run the scan.
2. Diff against the current index: new candidate categories, removed or moved
   sources, broken links, and changes in enforcement level.
3. Present only the differences for approval.
4. Update the index and its `Approved on` date only for approved changes.

## What does not belong in an index

- Copied numeric values or long rule text (link the source instead).
- Secrets, internal planning, or confidential product information.
- The other domain's requirements. Each repository describes only what **it** needs.
