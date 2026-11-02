# Contributing

Thanks for helping improve Agent Skills.

## Principles

- **Agent-agnostic.** Write instructions in terms of capabilities. Put host-specific
  tool names in a clearly labeled reference file.
- **Small core, details on demand.** Keep `SKILL.md` short and move detail into
  `references/` (loaded on demand) and templates into `assets/`.
- **Safe by default.** Do not pre-approve shell tools with `allowed-tools`. Never
  include secrets, personal data, or proprietary content.
- **Documented.** Every skill has user-facing docs in `docs/<name>/`.

## Adding a skill

1. Open a skill proposal issue describing the problem and why it is generic.
2. Create the layout:

   ```text
   skills/<name>/
   ├── SKILL.md
   ├── references/   (optional)
   ├── assets/       (optional)
   └── scripts/      (optional)
   docs/<name>/
   └── README.md     (required; add more pages as needed)
   ```

3. Follow the [Agent Skills specification](https://agentskills.io/specification):
   - `name`: 1–64 characters, lowercase letters, digits and single hyphens, not
     starting or ending with a hyphen, and equal to the directory name.
   - `description`: 1–1024 characters, saying what the skill does **and when to use
     it**, with the words users are likely to say.
   - Optional: `license`, `compatibility` (≤ 500 characters), `metadata` (string
     values; we use `metadata.version`), `allowed-tools` (a space-separated string).
   - Body under 500 lines; relative links one level deep from `SKILL.md`.
4. Add a row to the **Skills** table in `README.md` and in `docs/README.md`.
5. Add a `CHANGELOG.md` entry.
6. Validate:

   ```sh
   node scripts/validate-skills.mjs
   gh skill publish --dry-run
   ```

## Changing a skill

- Bump `metadata.version` using semantic versioning: patch for wording fixes, minor
  for new optional behavior, major for protocol or behavior changes that break
  existing users.
- Update the skill's docs in the same pull request.
- Test the skill in at least one host and describe the result in the pull request.

## Pull requests

Use the pull request template. CI runs the validator on every pull request.
