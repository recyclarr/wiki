# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## Project Overview

This is the official documentation website for Recyclarr, built using Docusaurus 3.8. The site
serves as both a wiki and documentation hub, with dual deployment environments:

- Production: `recyclarr.dev` (master branch)
- Next/Preview: `next.recyclarr.dev` (next branch)

## Development Commands

- `yarn` - Install dependencies
- `yarn start` - Development server with live reload at `http://localhost:3000`
- `yarn build` - Generate static content into `build/` directory
- `yarn serve` - Serve built site locally for testing
- `yarn clear` - Clear Docusaurus cache and generated files

**Testing with Playwright MCP:**

- ALWAYS use Playwright MCP for visual feedback when testing documentation changes
- NEVER run `yarn start` unless Playwright gives connectivity errors (user typically already running
  it)
- Navigate to `http://localhost:3000/wiki/[page]` to verify rendered output
- Use `browser_snapshot` to inspect page structure and verify content appears correctly

## Architecture

- Homepage redirects to `/wiki/` via `src/pages/index.js`
- All content in `docs/` directory (MDX format), routed to `/wiki/` path
- Auto-generated sidebar from folder structure via `sidebars.js`
- Category files (`_category_.yml`) control section organization
- `docusaurus.config.ts` - Main config with environment-aware hostname switching
- SCSS styling in `src/css/` (not plain CSS) - see Styling Architecture section
- Dark mode default, Algolia search, GitHub codeblock theme

## Content Guidelines

### Markdown Standards

- Max line length: 100 characters (hard wraps required)
- Markdownlint rules enforced via `.markdownlint.json`
- Tables must be properly formatted and aligned
- Admonitions must have spaces before/after content

## Documentation Writing Guidelines

Target audience: Beginners to Recyclarr (have Sonarr/Radarr running, new to optimization tools)

### Technical Accuracy & Verification Requirements

CRITICAL: YOU MUST verify against actual Recyclarr codebase behavior

- NEVER assume existing documentation is correct - validate against source code
- ALWAYS refer to code + other relevant docs for context when modifying documentation
- ALWAYS test documented procedures when possible
- ALWAYS validate YAML examples against actual schema requirements
- ALWAYS cross-reference CLI help output with documented commands
- Ask clarifying questions about intent, user behavior, edge cases code doesn't reveal
- Track version compatibility; validate configurations before documenting
- Follow existing conventions where appropriate

### Content Structure Templates

**ALL page types follow this beginner-friendly pattern:**

1. **Frontmatter**: Required fields (`id`, `title`, `sidebar_position` for config pages)
2. **Overview/Purpose**: What this does and why users want it (plain language outcomes)
3. **Quick Start**: Simplest working example first
4. **Detailed Content**: Step-by-step with context, organized basic → advanced
5. **Examples**: Multiple real-world scenarios with full YAML/commands
6. **Troubleshooting**: Common issues, quick fixes, prevention
7. **Next Steps/Related**: Clear guidance on what to do next, contextual links

**Page-specific additions:**

- **CLI pages**: Usage syntax reference, arguments/options with examples, "What Happens Next"
- **Config pages**: Compatibility tables, common pitfalls, related configuration
- **Setup pages**: Prerequisites with verification, alternative methods
- **Troubleshooting pages**: Root cause explanation, diagnostic steps

### Writing Style Guidelines

**Beginner-Friendly Requirements (CRITICAL):**

- Outcomes first: Lead with "what/why" before technical details
- Progressive disclosure: Simple → complex; basic examples before advanced
- Define terminology: Explain Recyclarr terms (trash IDs, instances, includes) on first use
- Concrete context: Specific home automation scenarios, not abstractions
- No assumptions: Explain configuration relationships and CLI patterns explicitly
- Helpful, encouraging tone without overwhelming detail
- Numbered lists for sequential procedures with context
- Descriptive, searchable headers; contextual cross-references
- Mark alternative paths (Docker vs Manual) and complexity levels clearly

### Markup Conventions

**Admonitions (semantic usage for beginners):**

- `:::info` - Optional steps, version notes, contextual explanations
- `:::tip` - Best practices, shortcuts ("For most home setups...")
- `:::warning` - Caution, common pitfalls ("Don't forget to restart...")
- `:::danger` - Critical warnings, data loss risks

**Code blocks (MUST specify language):** `bash` (commands), `yml` (configs), `js` (CLI syntax),
`txt` (file structures)

**Links:** Relative paths (`../page.mdx`) or root-relative (`/section/page.mdx`); define at bottom
if used multiple times

**Tables:** Properly formatted with headers; use compatibility tables for version requirements

## Upgrade Guide Standards

NEVER retroactively update upgrade guides (historical snapshots). Create unreleased guides when
deprecations are introduced.

**File:** `docs/upgrade-guide/v[X].0.mdx` with frontmatter:

```txt
---
title: Version [X].0 [(Unreleased)]
sidebar_position: [number]
---
```

**Structure:** Opening statement → Breaking changes sections (with anchor IDs) → Migration examples
(before/after YAML with `# <<< RENAMED` comments) → Cross-references

## Dependencies

Docusaurus 3.8 (TypeScript), React 19 (MDX), Node.js >=22.0.0, Algolia search, Iconify React,
docusaurus-plugin-sass

## Styling Architecture

### SCSS Organization

Custom styling uses SCSS (not plain CSS) organized into modular files:

- `src/css/_variables.scss` - CSS custom properties and theme variables
- `src/css/_navbar.scss` - Navigation bar styling (React Native inspired)
- `src/css/_sidebar.scss` - Documentation sidebar and menu styling
- `src/css/_layout.scss` - Page layout, responsive breakpoints, utilities
- `src/css/custom.scss` - Main stylesheet that imports all modules

### Docusaurus Version Compatibility

Current version: **Docusaurus 3.8**

**Important**: Custom styles target Docusaurus internal classes (`.navbar__*`, `.menu__*`,
`aside[class^="theme-doc-sidebar-container"]`). These selectors are version-specific.

### Upgrade Testing Checklist

When upgrading Docusaurus major or minor versions:

1. **Review Breaking Changes**: Check Docusaurus changelog for CSS/theme changes
2. **Test Build**: Run `yarn build` - must succeed
3. **Test Dev Server**: Run `yarn start` - verify no console errors
4. **Visual Regression Testing**:
   - Visit `/` - verify homepage navbar, logo animation, layout
   - Visit `/wiki/` - verify docs navbar, sidebar, menu items
   - Check navbar consistency between pages (same styling on both)
   - Test sidebar active states and category collapsing
   - Verify responsive design (resize browser window)
   - Test dark mode toggle
5. **Verify Internal Classes**: If styles break, inspect element to check if Docusaurus changed
   class names in:
   - Navbar components (`.navbar__*`)
   - Menu/sidebar components (`.menu__*`, `.theme-doc-sidebar-*`)
   - Layout wrappers (`.main-wrapper`, etc.)
6. **Update Version Notes**: Update compatibility comments in SCSS files if needed

### Future Flags

Docusaurus v4 future flags are **enabled** in `docusaurus.config.ts`:

```typescript
future: {
  v4: true,
}
```

This ensures compatibility with Docusaurus 4 breaking changes and makes future upgrades smoother.
