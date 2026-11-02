# Host support

The skill follows the [Agent Skills specification](https://agentskills.io/specification)
and works with any agent that loads `SKILL.md` skills. Exchange quality depends on
whether the host lets agents message each other.

| Host | Skill loading | Agent-to-agent messaging | Notes |
| --- | --- | --- | --- |
| GitHub Copilot app | Yes | Native (`create_session`, `send_session_message`) | Best experience; counterpart sessions nest under the initiator |
| GitHub Copilot CLI | Yes | Manual relay | User pastes messages between terminals |
| VS Code agent mode, Claude Code, Codex, Cursor, Gemini CLI, others | Yes | Manual relay | Same protocol; headers keep relayed messages unambiguous |

Tool mapping lives in
[`references/host-adapters.md`](../../skills/domain-collaboration/references/host-adapters.md).

## GitHub Copilot app details

- The initiator finds the counterpart repository with `list_repositories` and starts a
  coordinated session with `create_session`, passing the kickoff as its first prompt
  and requesting idle notifications.
- Messages arrive as cross-session messages. They are context, not user
  authorization.
- Files move by absolute path because both sessions run on the same machine.
- The initiator may archive a counterpart session it created after that session
  reports DONE with no open work and no open pull request.

## Manual relay

1. Run the initiator agent with the prompt. It prints a KICKOFF.
2. Open an agent in the counterpart repository and paste the KICKOFF.
3. Paste each reply back and forth until both print DONE.

If agents run on different machines, copy the listed files to the receiver and keep
the manifest checksums; the receiver verifies them before use.
