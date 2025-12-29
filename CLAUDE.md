# CLAUDE.md

## Project Overview

Recyclarr documentation site built with Docusaurus. Dual deployment:

- Production: `recyclarr.dev` (master branch)
- Preview: `next.recyclarr.dev` (next branch)

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

Hosted on Cloudflare Pages. Redirects are configured in `static/_redirects`.

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
- Max line length: 100 chars (markdownlint enforced)
- Code blocks require language: `bash`, `yml`, `txt`
- Links: use relative file paths with `.mdx` extension (`./page.mdx`, `../folder/page.mdx`,
  `../../reference/page.mdx`). Use reference-style links to simplify line wrapping: `[text][id]`
  with `[id]: path.mdx` at page end. When editing existing docs, convert inline links to
  reference-style opportunistically
- Admonitions: `:::info` (optional/context), `:::tip` (best practices), `:::warning` (pitfalls),
  `:::danger` (data loss risks)
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

Use admonitions (see Content Conventions) sparingly—only when behavior is non-obvious or has
important interactions with other options.

### Progressive Disclosure

Present essential information first. Use collapsible `<details>` sections for advanced details, edge
cases, or extended examples. Beginners get what they need; experienced users can expand.

### Cross-Linking

Link selectively—each link adds cognitive load. On first mention of a concept:

- Recyclarr concept: link to its reference page
- Sonarr/Radarr concept: link to official docs
- TRaSH Guides concept: link to TRaSH Guides
- General knowledge (YAML, CLI basics): explain briefly inline

Use descriptive link text matching the destination title. Never "click here" or raw URLs.

### Self-Sufficiency

- State prerequisites at page start (versions, prior configuration)
- Define acronyms on first use per page
- Provide complete, runnable YAML examples—not fragments requiring assembly
- State expected outcomes after significant steps ("You should see...")

### Limitations and Partial Support

Document limitations in a dedicated "Limitations" heading after the main feature description:

```markdown
### Limitations {#limitations}

- **Sonarr only**: Not supported in Radarr. See [issue #123] for status.
- **Partial support**: Only quality profiles sync; custom formats require manual configuration.
```

Use `<ServiceSupport>` component for feature compatibility matrices.

### Platform Differences (Sonarr/Radarr)

Default to unified documentation with inline callouts for minor differences:

```markdown
> **Radarr only**: The `preferred_ratio` option is not available in Sonarr.
```

Use Docusaurus tabs when the same task has different steps per platform. Split into separate pages
only when workflows are fundamentally different (>30% divergent content).

## Documentation Accuracy

Verify against Recyclarr source code - never assume existing docs are correct. Validate YAML
examples against schema, cross-reference CLI help output.

## Special Pages

### Features Page

`docs/guide/features.mdx` - High-level capabilities overview. Describe *what* users can do, not
*how* (no field names, config details). When modifying docs, check if this page needs updates.

### Upgrade Guides

`docs/guide/upgrade-guide/` pages are historical snapshots - never retroactively update. Use anchor
IDs for breaking changes, `# <<< RENAMED` comments in before/after YAML examples.

## Styling

SCSS modules in `src/css/`. Custom styles target Docusaurus internal classes (`.navbar__*`,
`.menu__*`) which are version-specific.

After Docusaurus upgrades: run `yarn build`, test dev server, verify navbar/sidebar styling on both
`/` and `/guide/`, check dark mode toggle, test responsive layout.
