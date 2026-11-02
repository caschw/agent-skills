# Handoffs

Agents exchange text messages; files move by path. A handoff is the only way content
crosses from one domain to another.

## The whitelist rule

A path listed in a HANDOFF manifest is authorized for the receiver to use as its kind
allows. Nothing else in the supplier's repository is. The receiver must not browse,
search, or read unlisted files, even if they sit next to listed ones.

This lets a repository whose instructions forbid reading other repositories still
receive specific deliverables, provided its instructions adopt this exception (see
[adoption.md](adoption.md)).

## Kinds

| Kind | Receiver may | Typical examples |
| --- | --- | --- |
| asset | Copy into its repository where its rules require | Screenshots, icons, social cards, approved policy text |
| informational | Read in place only | Release notes, a feature list to summarize, a data-handling description |
| processing | Copy into `.handoff-inbox/<exchange-id>/` only | High-resolution masters to resize, archives to unpack, CSVs to transform |

Processing copies are never committed. The inbox must be gitignored. Delete it after
the exchange or leave it for the user to inspect, but never stage it.

## Manifest

Use [`handoff-manifest.template.md`](../../skills/domain-collaboration/assets/handoff-manifest.template.md).
Each file entry has:

| Field | Why |
| --- | --- |
| Item | Ties the file to a REQUEST item |
| Absolute path | Unambiguous location on the shared machine |
| Kind | What the receiver may do with it |
| Purpose | Where it will be used |
| Format / dimensions | Lets the receiver check criteria before opening |
| Variant | Light/dark, density, locale, device, size class |
| SHA-256 | Detects changed or wrong files |
| Source revision | Commit the file came from, for provenance |
| Provenance and rights | How it was made, who may use it, any restrictions |

Facts travel inline with a source, and anything not supplied is listed with a reason
and alternative.

## Supplier checklist

- Produce deliverables only with your own domain's tools and data.
- Place them in your working tree or session scratch space; do not write to the
  receiver's repository.
- Compute checksums after the file is final (`shasum -a 256 <file>` or
  `sha256sum <file>`).
- Use genuine content. Do not fabricate screenshots, metrics, quotes, ratings, or
  legal and privacy statements.
- Exclude secrets, personal data, and internal planning material.

## Receiver checklist

- Confirm every path is listed and the checksum matches.
- Check acceptance criteria (open images to check dimensions and appearance).
- Copy assets without modifying them beyond what your rules allow (for example
  resizing or re-encoding) and record provenance as your repository requires.
- Keep processing files in the inbox; keep informational files in place.
- ACK or REJECT every item.
