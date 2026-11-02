# Examples

All names are fictional. Messages are abbreviated.

## 1. Onboard a new product (product side initiates)

**User prompt in `example-app`:**

> Work with the website agent to onboard new product "Example App". Provide them with
> any content it asks for.

**KICKOFF** (example-app → website):

```text
[domain-collaboration] example-app-website-20260301-onboarding KICKOFF 1
User's request (verbatim): "Work with the website agent to onboard new product
'Example App'. Provide them with any content it asks for."
Expected requirement ownership: website owns requirements for all published content.
```

**REQUEST** (website, derived from its intake index):

```text
[domain-collaboration] example-app-website-20260301-onboarding REQUEST 1
1. Identity: product name, one-line summary, platform(s). Source: catalog schema.
2. Distribution: availability status and verified store URL, or "not yet available".
3. Icon: PNG, light and dark, 1x/2x/3x at sizes in docs/products.md#icons.
4. Screenshots: genuine captures, light and dark, devices and sizes per docs/media.md.
5. Features: 3–5 descriptions within limits in the content schema.
6. Privacy: data collected, storage location, sync, deletion/export. Verified from
   app code or approved policy text.
7. Support: contact route and accessibility notes.
8. Provenance and rights for every file.
```

The app agent answers a QUESTION about which devices it supports, sends a HANDOFF with
assets and facts, gets one REJECT (dark screenshots missing), fixes, gets ACK. The
website integrates, runs its checks, opens a pull request, and BLOCKs on owner
approval of the privacy policy text. Both send DONE.

## 2. Release refresh (product side initiates)

> Version 2.0 changed the editor. Work with the website agent so the website reflects
> it.

The app agent states what changed in KICKOFF context. The website, as requirements
owner, requests only the affected screenshots and copy; unchanged screens are not
re-requested.

## 3. Website redesign (website initiates)

> The redesign uses 4:3 hero images. Work with the Example App agent to get compliant
> hero images.

The website sends KICKOFF and REQUEST together, citing its updated design source. The
app agent supplies new captures or answers that a 4:3 capture would need cropping and
proposes options; the website BLOCKs for the user to choose.

## 4. Conflicting facts

The website's current page says "no data leaves the device"; the app agent reports an
optional cloud sync. The website does not pick an answer. It sends BLOCKED to its user
with both statements and sources, and the privacy item stays open until the owner
decides.

## 5. Initialize an intake index

> Initialize this repository's intake index using the domain-collaboration skill.

The agent presents, for example:

| Category | Requirement | Enforcement | Evidence | Confidence |
| --- | --- | --- | --- | --- |
| Visual assets | Screenshots declare natural dimensions and alt text | enforced | `src/schema.ts:42`, `tests/catalog.test.ts:88` | high |
| Visual assets | Light and dark captures | inferred | `public/media/*-dark.png` | medium |
| Privacy | App policy approved by owner before publishing | documented | `AGENTS.md:57` | high |

It flags the inferred item and asks whether to document it or leave it out.
