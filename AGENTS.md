## Project Overview

Recyclarr documentation site built with Docusaurus.

### Branches

- `master` -- Production (`recyclarr.dev`). Documentation for the current stable release.
- `next` -- Preview (`next.recyclarr.dev`). New feature docs and breaking changes only.

Use `master` for retroactive documentation updates: clarifying existing features, adding missing
docs, rewording, configuration changes, and non-docs changes. Use `next` for documentation that
describes unreleased features or breaking changes.

On each Recyclarr minor or major release, `next` is fast-forward merged into `master` so that new
feature docs publish alongside the release.

## Authoritative Reference

Use research agents to access upstream repositories for factually correct information:

- `recyclarr-code-researcher` - Recyclarr source code and memory bank
- `config-templates-researcher` - Official configuration templates
- `trash-guides-researcher` - TRaSH Guides custom formats, quality profiles, trash_ids

YAML examples must use real trash_ids - never placeholders.

## Commands

- `yarn start` - Dev server at `localhost:3000`
- `yarn build` - Build static site
- `yarn clear` - Clear cache

Run `pre-commit run --files <files>` on modified files after making changes.

## Deployment

Hosted on Cloudflare Pages. Docusaurus is configured with `trailingSlash: true` (in
`docusaurus.config.ts`), so all generated URLs end with `/`.

Redirects are configured in `static/_redirects`. Cloudflare Pages evaluates `_redirects` before its
own static asset routing (including its built-in trailing-slash 308 normalization). Paths are
matched exactly, so `/guide/foo` and `/guide/foo/` are distinct sources. Always include both
variants for each redirect to avoid missed redirects or double hops.

Redirect capabilities:

- Can redirect TO fragments: `/old /new#anchor 301`
- Cannot redirect FROM fragments (anchors are client-side, never sent to server)

Limits: 2,000 static + 100 dynamic redirects, 1,000 chars per rule.

## Architecture

- Unified docs directory: `docs/guide/`, `docs/reference/`, `docs/cli/`
- Sidebars: `sidebars-guide.js`, `sidebars-reference.js`, `sidebars-cli.js`
- Category organization: `_category_.yml` files
- Styling: SCSS in `src/css/` (not plain CSS)

## MDX Components & Imports

Available components in MDX files:

- `<ServiceSupport>` - Sonarr/Radarr compatibility tables
- `<SupportLegend>` - Legend for support icons
- `<ReleaseDate date="YYYY-MM-DD" />` - Release date badge for upgrade guides (omit `date` for
  unreleased)
- `<Icon icon="mdi:icon-name" />` - Material Design Icons via Iconify

Import paths:

- `@site/src/...` - Project files (components, partials)
- `@theme/...` - Docusaurus theme components
- Partials use underscore prefix: `src/partials/_name.mdx`

Static assets: `/img/` (logos), `/doc-img/` (screenshots)

## Content Conventions

- Omit `id` in frontmatter when filename matches desired id; keep `id` when filename differs (e.g.,
  `cache-rebuild.mdx` with `id: rebuild` for URL `/cli/cache/rebuild`)
- Headings MUST use explicit anchors: `## Heading {#anchor-id}` - concise, rely on page context
- Line length MUST be hard wrapped at exactly 100 columns (Prettier `printWidth: 100`). Fill lines
  to the full 100 columns before wrapping. Wrapping early (at 80, 90, or any width below 100) is
  wrong. When in doubt, count characters.
- Code blocks require language: `bash`, `yml`, `txt`
- Links: use relative file paths with `.mdx` extension (`./page.mdx`, `../folder/page.mdx`,
  `../../reference/page.mdx`). Use reference-style links to simplify line wrapping: `[text][id]`
  with `[id]: path.mdx` at page end. When editing existing docs, convert inline links to
  reference-style opportunistically
- Admonitions: `:::info` (optional/context), `:::tip` (best practices), `:::warning` (pitfalls),
  `:::danger` (data loss risks). MUST have blank line after opening `:::type` and before `:::`
- Emdashes (—) are acceptable in documentation for parenthetical phrases and emphasis

Target audience: Beginners to Recyclarr. Lead with outcomes, simple examples first. Never use "SQP"
in examples - those quality profile names are intentionally undocumented.

## Documentation Principles

### Document Type Separation

The site uses three documentation types aligned to the Divio system:

- `docs/guide/` (tutorials/how-to): Learning and task-oriented. Step-by-step, complete workflows
- `docs/reference/` (reference): Technical descriptions. Terse, structured around configuration
- `docs/cli/` (reference): CLI command documentation. Mirrors `--help` output structure

Never mix types: tutorials teach concepts progressively; reference docs describe exhaustively.

### Reference Documentation Completeness

Reference pages for YAML configuration (`docs/reference/configuration/`) follow a consistent
structure:

**Page structure:**

1. Frontmatter with `title` and `description`
2. `<ServiceSupport>` component showing Sonarr/Radarr compatibility
3. Complete YAML example showing all properties in context
4. Brief intro paragraph explaining the parent node
5. Each property as a heading: `## \`property_name\` {#anchor}`

Settings reference pages (`docs/reference/settings/`) omit `<ServiceSupport>` because settings are
configuration-agnostic (they apply regardless of Sonarr/Radarr). Otherwise they follow the same
structure.

**Requirement markers** (first line after heading, always in this format):

- `**Required.**` - no default needed
- `**Optional.** *Default: \`value\`*` - literal defaults in backticks
- `**Optional.** *Default: No custom formats are synced*` - descriptive defaults in plain text
- `**Conditionally Required.** *Default: ...*` - explain the condition in the description

**Property documentation includes:**

- Requirement marker with default (as above)
- What the property does (1-2 sentences)
- Valid values or constraints (if applicable)
- Relationship to Sonarr/Radarr UI fields when relevant

**Nested property anchors** use prefixes to avoid conflicts: `{#rus-enabled}` for
`reset_unmatched_scores.enabled`, `{#qualities-name}` for `qualities[].name`.

Use admonitions sparingly - only when behavior is non-obvious or has important interactions.

### Writing for Readers

- Present essential information first; use `<details>` for advanced content
- Link selectively - each link adds cognitive load. On first mention: Recyclarr concepts link to
  reference pages, Sonarr/Radarr to official docs, TRaSH Guides to their site
- State prerequisites at page start; define acronyms on first use
- Provide complete, runnable YAML examples - not fragments requiring assembly
- State expected outcomes after significant steps

### Single Source of Truth

Every configuration property, behavioral concept, and factual claim MUST have exactly one
**canonical page** where it is fully documented. The canonical location is determined by document
type:

- Configuration properties: their reference page in `docs/reference/configuration/`
- Settings properties: their reference page in `docs/reference/settings/`
- CLI flags/options: their CLI page in `docs/cli/`
- Concepts (e.g., profile variants, guide-backed profiles): a dedicated reference page

Removed or deprecated features belong only in upgrade guides, not in reference pages.

**Referencing canonical content from other pages:**

Other pages SHOULD characterize the concept in 1-2 sentences and link to the canonical page. The
characterization describes *what it does* and *why a user would care*, not *how it works in detail*.
This gives tutorials enough context to teach without re-documenting behavior.

Acceptable in non-canonical pages:

- Brief characterization (1-2 sentences) with a link to canonical page
- Complete YAML examples that include the property (examples MUST be runnable)
- Inline comments in YAML showing simple values (e.g., `# Settings > General > API Key`)

Prohibited in non-canonical pages:

- Re-explaining valid values, edge cases, or behavioral details
- Reproducing lists, tables, or enumerations from the canonical page
- Documenting limitations or constraints (these belong on the canonical page only)

**Decision test:** If the behavior of a feature changed, would you need to update this page? If yes,
and it is not the canonical page, the content is too detailed. Reduce to a characterization and
link.

**When to create a dedicated page:** If a concept is referenced from 3+ pages and requires more than
a 2-sentence characterization to explain, it needs its own canonical page rather than being embedded
in a parent page's property documentation.

### Platform Differences (Sonarr/Radarr)

Default to unified documentation with inline callouts (e.g., `> **Radarr only**: ...`) for minor
differences. Use Docusaurus tabs when steps differ per platform. Split into separate pages only when
workflows are fundamentally different (>30% divergent content).

Document limitations in a dedicated `### Limitations {#limitations}` heading. Use `<ServiceSupport>`
for feature compatibility matrices.

## Documentation Accuracy

Verify against Recyclarr source code - never assume existing docs are correct. Validate YAML
examples against schema, cross-reference CLI help output.

## Special Pages

### Features Page

`docs/guide/features.mdx` - High-level capabilities overview. Describe *what* users can do, not
*how* (no field names, config details). When modifying docs, check if this page needs updates.

### Upgrade Guides

`docs/guide/upgrade-guide/` pages are historical snapshots; never retroactively update. Use anchor
IDs for breaking changes, `# <<< RENAMED` comments in before/after YAML examples. Avoid statements
about future releases (e.g., "will be removed in a future version"); document current behavior only.

Published upgrade guides MUST include a `<ReleaseDate date="YYYY-MM-DD" />` component immediately
after the frontmatter import block showing the release date of that major version. Use the date from
the GitHub release tag. The unreleased guide uses `<ReleaseDate />` without a date prop.

**Retention policy:** MUST keep only the four latest major versions. The latest major version is
typically unreleased and tracks deprecations during development. This means three published release
guides plus one unreleased guide. When a new major version begins development:

1. Create a new `vN.0.mdx` with `(Unreleased)` in the title and an admonition stating it tracks
   deprecations for the current development cycle
2. Delete the oldest upgrade guide to maintain four total
3. Add a redirect for the deleted page to `/guide/upgrade-guide`

## Styling

SCSS modules in `src/css/`. Custom styles target Docusaurus internal classes (`.navbar__*`,
`.menu__*`) which are version-specific.

After Docusaurus upgrades: run `yarn build`, test dev server, verify navbar/sidebar styling on both
`/` and `/guide/`, check dark mode toggle, test responsive layout.
