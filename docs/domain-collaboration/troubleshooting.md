# Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Counterpart never replies | Session waiting on its user, or busy | Check its status (`get_session` in the Copilot app); answer its question; retry once |
| Counterpart ignores the protocol | Skill not installed or not loaded | Install the skill; include "Load the domain-collaboration skill" in the kickoff |
| Counterpart refuses to read a handoff path | Its instruction file forbids reading other repositories | Add the handoff exception from [adoption.md](adoption.md) or have the user approve |
| Same item rejected repeatedly | Criteria unclear or unattainable | After two REJECTs the item goes to the user; restate criteria with sources |
| Agents disagree on a fact | Stale content or real behavior change | Never auto-resolve; user decides with both sources |
| Requester asks for things outside scope | Over-eager discovery | Supplier answers out of scope; requester asks its own user |
| Intake index links broken | Sources moved or renamed | Run an intake refresh; add the link test |
| Requests miss obvious needs | No intake index | Initialize one; until then the agent derives from docs |
| Processing files appear in `git status` | Inbox not gitignored | Add `.handoff-inbox/` to `.gitignore`; never commit inbox content |
| Checksum mismatch | File changed after manifest | Supplier recomputes and re-sends HANDOFF |
| Commit or pull request refused | Repository requires explicit approval | Expected; the agent BLOCKs and waits for the user |
