# Exchange mode

An **exchange** is one bounded collaboration between two domains to satisfy one user
prompt. Read the whole file before sending the first message.

## Roles

- **Initiator**: the agent that received the user's prompt.
- **Counterpart**: the agent that owns the other domain.
- **Requirements owner**: whichever side will publish or consume the deliverables. It
  leads the asks, whether or not it initiated.
- **Supplier**: the side that produces deliverables from its own verified domain.

Both sides can be requirements owner and supplier for different items in the same
exchange (for example, the website needs screenshots while the app needs updated
marketing copy approved by the website's style rules).

## Lifecycle

1. **Prepare (initiator)**
   - Read your repository's instruction files and, if present, your intake index.
   - Confirm the prompt identifies the counterpart domain. If it does not and you
     cannot determine it unambiguously, ask the user.
   - Create the exchange id: `<initiator>-<counterpart>-<yyyymmdd>-<short-slug>`
     using repository names, lowercase and hyphenated.
   - Keep working notes in session scratch space, not in the repository.
2. **Connect (initiator)**
   - Reuse a counterpart session the user named. Otherwise create one in the
     counterpart repository (see [host-adapters.md](host-adapters.md)).
   - Send the kickoff using [../assets/kickoff.template.md](../assets/kickoff.template.md).
     Quote the user's prompt **verbatim** and in full. Add only facts the counterpart
     needs; do not expand scope.
3. **Orient (counterpart)**
   - Load this skill, read your repository's instruction files and intake index.
   - Confirm the quoted scope is something your repository rules permit. If not, send
     `BLOCKED` explaining the rule and ask your user.
   - Reply with `ACK-KICKOFF` stating which side owns which requirements, or the first
     `REQUEST` if you are the requirements owner.
4. **Discover (requirements owner)**
   - Derive needs from the quoted scope and your requirements sources. For each need,
     state acceptance criteria: format, dimensions, variants (light/dark, density,
     locale, device), wording limits, factual verification, provenance or licensing.
   - Point to your source for each criterion (path and section) so the supplier can
     understand why, but do not ask the supplier to read your repository.
   - Ask for everything the scope implies. For an onboarding scope that usually means
     identity, platform and distribution facts, visual assets, feature descriptions,
     privacy and data-handling facts, support and accessibility information, and
     provenance, but always as listed by **your** intake index.
5. **Supply (supplier)**
   - Produce or locate each deliverable inside your own domain using your own tools.
   - If you cannot meet a criterion, say so in an `ANSWER` and propose alternatives
     rather than delivering something non-compliant.
   - Send `HANDOFF` with a manifest
     ([../assets/handoff-manifest.template.md](../assets/handoff-manifest.template.md)).
6. **Verify (requirements owner)**
   - For every manifest entry: confirm the path is listed, the SHA-256 matches, and the
     acceptance criteria are met (open images to check dimensions and appearance).
   - Send `ACK` for accepted items and `REJECT` for failed ones with the exact failed
     criteria. Never silently fix another domain's content in a way that changes its
     meaning.
7. **Integrate (each side, in its own repository)**
   - Copy assets into the repository locations your rules require. Copy processing-only
     files to `.handoff-inbox/<exchange-id>/` (gitignored). Read informational files in
     place.
   - Record provenance the way your repository requires (source repository, revision,
     path, checksum, rights).
   - Update every directly related document and test your repository rules require.
8. **Complete (each side)**
   - Run your repository's verification commands.
   - Commit on your current working branch and open a pull request in your own
     repository, unless the prompt or your rules say otherwise.
   - Send `DONE` with the pull request link and verification summary. Wait for the
     other side's `DONE`, then report to your user.

## Message format

Every message starts with one header line, then a short body:

```text
[domain-collaboration] <exchange-id> <TYPE> <seq>
```

`<seq>` increases by one per message you send. Keep bodies factual and brief.

| Type | Sent by | Purpose |
| --- | --- | --- |
| `KICKOFF` | initiator | Verbatim user prompt, roles, counterpart repo, exchange id |
| `ACK-KICKOFF` | counterpart | Accepts scope, states requirement ownership |
| `REQUEST` | requirements owner | Numbered needs with acceptance criteria and sources |
| `QUESTION` | either | One clarification, referencing a REQUEST item number |
| `ANSWER` | either | Answer to a QUESTION, or a statement that an item cannot be met |
| `HANDOFF` | supplier | Manifest of whitelisted files and inline facts |
| `ACK` | receiver | Items accepted |
| `REJECT` | receiver | Items rejected with failed criteria |
| `BLOCKED` | either | Waiting on the user; states the exact decision needed |
| `DONE` | either | Pull request link, verification commands and results |
| `CANCEL` | either | User cancelled or scope cannot be satisfied; states why |

Facts that are not files (feature descriptions, privacy statements, support email,
store identifiers) travel inline in `HANDOFF` under a **Facts** list, each with its
source (path and revision, or "owner statement on <date>").

## Scope control

- If the requirements owner needs something outside the quoted scope, it sends
  `BLOCKED` to its own user, not a REQUEST to the other agent.
- If a REQUEST item exceeds the quoted scope, the supplier answers that it is out of
  scope and continues with the rest.
- Requirements discovered mid-exchange that are inside the scope are fine to add.

## Escalation

Send `BLOCKED` and ask the user when:

- the same item is rejected twice;
- the two domains state conflicting facts (for example different privacy behavior);
- a deliverable needs an owner approval, legal statement, payment, or credential;
- repository rules on either side forbid a needed step;
- the counterpart is unresponsive after the host's idle notification and one retry.

Never resolve a factual conflict by choosing the more convenient answer.

## Initiated from either side

The protocol is symmetric. If the product side initiates ("we shipped 2.0, update the
website"), it sends KICKOFF; the website side, as requirements owner, then sends
REQUEST. If the website side initiates ("redesign needs new hero images from every
app"), the website sends KICKOFF and REQUEST together.

## Multiple counterparts

Run one exchange per counterpart, each with its own id. Do not merge unrelated domains
into one conversation. Report a combined summary to the user at the end.
