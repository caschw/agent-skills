# Changelog

All notable changes are recorded here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Each skill is versioned
independently with `metadata.version` in its `SKILL.md`.

## [Unreleased]

### Added

- `domain-collaboration` 0.1.0: exchange protocol for agents in different
  repositories, whitelisted file handoffs, and intake index initialization and refresh.
- Repository validator, CI workflow, and community files.
- `AGENTS.md` and `.github/copilot-instructions.md` for agents working in this
  repository, with references to the skill standards.

### Fixed

- The validator now checks Markdown links under `.github/`; it previously skipped
  every path starting with `.git`.

### Changed

- `domain-collaboration` 0.1.1: an unattended intake writes a draft index pending
  owner approval instead of treating silence as approval; the template gains Status
  and Known limitations sections. Found by the first real intake test.
