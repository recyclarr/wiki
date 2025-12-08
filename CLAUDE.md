# CLAUDE.md

## Project Overview

Recyclarr documentation site built with Docusaurus. Dual deployment:

- Production: `recyclarr.dev` (master branch)
- Preview: `next.recyclarr.dev` (next branch)

## Authoritative Reference

Use octocode to access files in these upstream official repos as an authoritative reference for
factually correct information in the docs:

- Recyclarr Code: `https://github.com/recyclarr/recyclarr`
- Recyclarr Config Templates: `https://github.com/recyclarr/config-templates`

## Commands

- `yarn start` - Dev server at `localhost:3000`
- `yarn build` - Build static site
- `yarn clear` - Clear cache

## Architecture

- Multi-instance docs: `docs-guide/` → `/guide/`, `docs-reference/` → `/reference/`, `docs-cli/` →
  `/cli/`
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

- Omit `id` in frontmatter - Docusaurus derives from filepath
- Max line length: 100 chars (markdownlint enforced)
- Code blocks require language: `bash`, `yml`, `txt`
- Links: within-instance use relative paths with `.mdx` (`./page.mdx`, `../folder/page.mdx`);
  cross-instance use absolute paths (`/reference/page`)
- Admonitions: `:::info` (optional/context), `:::tip` (best practices), `:::warning` (pitfalls),
  `:::danger` (data loss risks)

Target audience: Beginners to Recyclarr. Lead with outcomes, simple examples first. Never use "SQP"
in examples - those quality profile names are intentionally undocumented.

## Documentation Accuracy

Verify against Recyclarr source code - never assume existing docs are correct. Validate YAML
examples against schema, cross-reference CLI help output.

## Special Pages

- `docs-guide/features.mdx` - High-level overview only; link to reference docs for details
- Upgrade guides (`docs-guide/upgrade-guide/`) are historical snapshots - never retroactively
  update. Use anchor IDs for breaking changes, `# <<< RENAMED` comments in before/after YAML
  examples

## Styling

SCSS modules in `src/css/`. Custom styles target Docusaurus internal classes (`.navbar__*`,
`.menu__*`) which are version-specific.

After Docusaurus upgrades: run `yarn build`, test dev server, verify navbar/sidebar styling on both
`/` and `/guide/`, check dark mode toggle, test responsive layout.
