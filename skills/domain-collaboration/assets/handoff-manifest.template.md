[domain-collaboration] {{exchange-id}} HANDOFF {{seq}}

Responds to: REQUEST {{request-seq}} items {{item-numbers}}
Source repository: {{owner/repo}} at revision {{commit-sha}}

## Files

Only these paths are authorized for the receiver.

| # | Item | Absolute path | Kind | Purpose | Format / dimensions | Variant | SHA-256 | Provenance and rights |
| - | ---- | ------------- | ---- | ------- | ------------------- | ------- | ------- | --------------------- |
| 1 | {{n}} | {{/abs/path}} | asset \| informational \| processing | {{use}} | {{png 1290x2796}} | {{light, @3x, en-US}} | {{sha256}} | {{how produced; rights}} |

Kinds:

- `asset`: copy into the receiver's repository where its rules require.
- `informational`: read in place; do not copy.
- `processing`: copy only into `.handoff-inbox/{{exchange-id}}/` (gitignored).

## Facts

| # | Item | Fact | Source |
| - | ---- | ---- | ------ |
| 1 | {{n}} | {{statement}} | {{path@revision or "owner statement on YYYY-MM-DD"}} |

## Not supplied

| Item | Reason | Proposed alternative |
| ---- | ------ | -------------------- |
| {{n}} | {{does not exist / out of scope / needs owner}} | {{option}} |
