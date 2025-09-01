# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## Project Overview

This is the official documentation website for Recyclarr, built using Docusaurus 3.8. The site
serves as both a wiki and documentation hub, with dual deployment environments:

- Production: `recyclarr.dev` (master branch)
- Next/Preview: `next.recyclarr.dev` (next branch)

## Development Commands

### Installation

```bash
yarn
```

### Development Server

```bash
yarn start
```

Starts local development server with live reload at `http://localhost:3000`

### Build

```bash
yarn build
```

Generates static content into the `build` directory

### Serve Built Site

```bash
yarn serve
```

Serves the built site locally for testing production builds

### Clear Cache

```bash
yarn clear
```

Clears Docusaurus cache and generated files

## Architecture

### Site Structure

- **Homepage**: Redirects to `/wiki/` via `src/pages/index.js`
- **Documentation**: All content in `docs/` directory, routed to `/wiki/` path
- **Sidebar**: Auto-generated from directory structure via `sidebars.js`

### Key Configuration

- **docusaurus.config.ts**: Main configuration with environment-aware hostname switching
- **Custom CSS**: `src/css/custom.css` with dark theme as default
- **MDX Components**: Enhanced with Iconify icon support via `src/theme/MDXComponents.tsx`

### Content Organization

- `docs/` - All documentation content in MDX format
- Auto-generated sidebar from folder structure
- Category files (`_category_.yml`) control section organization
- Environment-specific configuration based on `GITHUB_REF`

### Theming

- Dark mode default with switch disabled
- Algolia search integration
- GitHub codeblock theme with source links enabled
- Custom header with version switcher

## Content Guidelines

### Markdown Standards

- Max line length: 100 characters (hard wraps required)
- Markdownlint rules enforced via `.markdownlint.json`
- Tables must be properly formatted and aligned
- Admonitions must have spaces before/after content

### Admonition Usage

- `:::info` - Optional steps, informational content
- `:::tip` - Advice and tips
- `:::warning` - Caution messages
- `:::danger` - Critical warnings about what not to do

## Quality Assurance

### Development Checklist

- Run `yarn start` to verify no console errors/warnings
- Check rendered output appears correctly
- Ensure all links work and are not broken

### CI/CD

- Markdown linting via GitHub Actions
- Automated deployment to Cloudflare Pages
- Branch-specific deployments (master → production, next → preview)

## Documentation Writing Guidelines

When writing or editing documentation in this wiki, follow these comprehensive guidelines to
maintain consistency with existing content and ensure accuracy.

### Target Audience

Primary Audience: Beginners to Recyclarr

Users who already have Sonarr/Radarr running but are new to optimizing them with community guides
and automation tools. They need gradual learning curves and easily findable information.

**User Characteristics:**

- Have basic home automation setup (Sonarr/Radarr configured and working)
- Want to improve their setup but don't know where to start
- Comfortable with technology but new to Recyclarr concepts
- Get overwhelmed by too much technical detail presented too quickly
- Need clear "what and why" before diving into "how"
- Struggle to find information when navigation isn't intuitive

**Documentation Approach:**

- Start with outcomes and benefits before technical details
- Show simple examples before complex configurations
- Provide multiple learning paths (quickstart vs comprehensive)
- Explain Recyclarr-specific terminology clearly
- Use progressive disclosure from basic to advanced concepts

### Technical Accuracy & Verification Requirements

CRITICAL: Always verify against actual Recyclarr codebase behavior

- Never assume existing documentation is correct - validate against source code
- When modifying documentation, ALWAYS refer to the code + other relevant docs for context
- Try to follow existing conventions where it makes sense
- Test documented procedures when possible
- Ask clarifying questions about intent, user behavior, and edge cases that code doesn't reveal
- Version compatibility tracking and testing requirements
- Configuration validation requirements before documenting
- Cross-reference CLI help output with documented commands
- Validate YAML examples against actual schema requirements

### Content Structure Templates

#### CLI Command Pages

Follow this beginner-friendly structure pattern:

1. **Frontmatter**: `id`, `title` (format: "recyclarr [command]")
2. **What This Command Does**: Plain language explanation of purpose and outcomes
3. **When You'd Use This**: Common scenarios and use cases
4. **Basic Usage**: Simple example with most common options
5. **Usage Syntax**: Full command syntax reference
6. **Arguments & Options**: Detailed explanations with practical examples
7. **Common Examples**: Multiple real-world use cases
8. **What Happens Next**: Expected results and next steps
9. **Troubleshooting**: Common issues specific to this command

#### Configuration Reference Pages

1. **Frontmatter**: `id`, `title`, `sidebar_position`
2. **Overview**: What this configuration does and why you'd want it
3. **Quick Start**: Simplest working example first
4. **Basic Configuration**: Common settings most users need
5. **Advanced Configuration**: Optional features and complex scenarios
6. **Compatibility Tables**: Service version requirements when applicable
7. **Complete Examples**: Full YAML configurations for typical setups
8. **Common Pitfalls**: What often goes wrong and how to avoid it
9. **Related Configuration**: Links to related pages with context

#### Installation/Setup Pages

1. **What You'll Achieve**: Clear outcome statement
2. **Prerequisites**: What you need before starting (with verification steps)
3. **Quick Start**: Fastest path to working setup
4. **Detailed Instructions**: Step-by-step procedures with explanations
5. **Verification**: How to confirm success with expected output
6. **Common Issues**: Troubleshooting integrated into the process
7. **Next Steps**: Clear guidance on what to do after installation
8. **Alternative Methods**: Other installation approaches if needed

#### Troubleshooting Pages

1. **Problem Summary**: Clear description of symptoms
2. **Quick Fix**: Most common solution first
3. **Detailed Diagnosis**: How to identify the root cause
4. **Step-by-Step Solution**: Detailed resolution process
5. **Why This Happens**: Root cause explanation
6. **Prevention**: How to avoid in future
7. **Related Issues**: Links to similar problems

### Writing Style Guidelines

**For Beginner-Friendly Content:**

- **Start with Outcomes**: Always begin with "what this does for you" and "why you'd want it"
- **Progressive Disclosure**: Simple concepts first, then build to complex configurations
- **Plain Language**: Explain technical terms when first introduced
- **Concrete Examples**: Use specific scenarios rather than abstract descriptions
- **User Context**: Show examples that reflect typical home automation setups

**General Style:**

- **Tone**: Helpful and encouraging, technically accurate without being overwhelming
- **Voice**: Clear and supportive, acknowledging that learning new tools can be challenging
- **Instructions**: Use numbered lists for sequential procedures with explanatory context
- **Headers**: Follow strict hierarchy with descriptive, searchable titles
- **Cross-references**: Link with context about why the user would want to follow the link
- **Context-switching**: Provide alternative paths clearly marked (Docker vs Manual, etc.)

**Terminology and Explanations:**

- **Define Terms**: Explain Recyclarr-specific concepts (trash IDs, instances, includes) on first
  use
- **Provide Context**: Include "what this means" explanations for technical concepts
- **Common Scenarios**: Use phrases like "If you want to..." and "Most users will..."
- **Acknowledge Complexity**: Mark advanced sections clearly: "Advanced users can also..."
- **Avoid Assumptions**: Don't assume users know configuration file relationships or CLI patterns

### Markup Conventions

#### Admonition Usage (Semantic Rules)

Use admonitions strategically to provide context and guide beginners:

- `:::info` - Optional steps, version notes, "what this means" explanations
- `:::tip` - Best practices, helpful suggestions, "most users will want to..."
- `:::warning` - Caution messages, things to be careful about, common pitfalls
- `:::danger` - Critical warnings about what NOT to do, data loss risks
- `:::caution` - Less severe warnings (rarely used)

**Beginner-Friendly Admonition Patterns:**

- Use `:::info` for contextual explanations: "This setting controls..."
- Use `:::tip` for shortcuts and best practices: "For most home setups..."
- Use `:::warning` for common mistakes: "Don't forget to restart the service..."
- Include "what happens if you skip this" context when relevant

#### Code Blocks

- **Always specify language**: `bash`, `yml`, `js`, `txt` - never leave unspecified
- **Common patterns**:
  - `js` for CLI syntax examples
  - `bash` for command line examples
  - `yml` for configuration examples
  - `txt` for file structures or plain text

#### Links

- **Internal links**: Use relative paths (`../page.mdx`) or root-relative (`/section/page.mdx`)
- **Link reference style**: Define links at bottom of page when used multiple times
- **Cross-service links**: Link between Sonarr/Radarr shared concepts

#### Tables

- Always properly format and align markdown tables
- Include headers for clarity
- Use compatibility tables for version requirements

### Docusaurus-Specific Features

#### Frontmatter Standards

```txt
---
id: unique-identifier
title: Human Readable Title
sidebar_position: number
---
```

#### Special Components

- `<details>`/`<summary>` for collapsible optional content (Docker vs Manual sections)
- `import TOCInline from '@theme/TOCInline'` for inline table of contents
- `<icon icon="iconify:icon-name" />` for icons via MDX components

#### Include System

- Understand `_include-templates-dir.mdx` and `_configs-common.mdx` patterns
- Include templates live in `/includes/` directory structure
- Document include dependencies and relationships

### Content Maintenance & Lifecycle

#### Version Management

- Follow v8.0 upgrade guide patterns for version-specific documentation
- Clearly mark deprecated features with timeline for removal
- Update compatibility tables when versions change
- Handle breaking changes with migration guidance

#### Cross-Reference Maintenance

- Validate internal links regularly
- Update references when pages move or are renamed
- Maintain consistency across related sections
- Document external dependency changes (TRaSH Guides, GitHub repos)

### User Journey Optimization

#### Information Findability

- **Clear Entry Points**: Provide obvious starting points for different user goals
- **Search-Friendly Headers**: Use descriptive titles that match how users think about tasks
- **Multiple Learning Paths**: Offer both "Quick Start" and "Comprehensive Guide" approaches
- **Contextual Cross-Links**: Link with explanatory text: "Next, you'll need to configure..."

#### Progressive Disclosure

- **Simple to Complex**: Always show the basic example before advanced configurations
- **Layered Information**: Use collapsible sections for optional details
- **Clear Boundaries**: Mark sections as "Basic", "Intermediate", or "Advanced"
- **Prerequisites**: Link to prerequisite knowledge with context about why it's needed
- **Happy Path**: Clearly identify the most common/recommended approach

#### Error Recovery and Support

- **Integrated Troubleshooting**: Include common issues within procedural sections
- **"What If" Sections**: Address likely failure points before they occur
- **Alternative Approaches**: When something doesn't work, provide other methods
- **Common Pitfalls**: Document frequent mistakes and how to avoid them
- **Expected Results**: Show what success looks like at each step

### Quality Standards & Review Process

#### Before Publishing

- Verify all configuration examples work with current Recyclarr version
- Test documented procedures on clean environment when possible
- Check all internal and external links
- Validate YAML syntax and schema compliance
- Run `yarn start` and verify rendering

#### Content Consistency

- Use established terminology throughout (instance, service, configuration)
- Follow naming conventions for files and sections
- Maintain consistent formatting of CLI commands and options
- Align with TRaSH Guide terminology where applicable

#### Accessibility Considerations

- Provide alternative text for images and diagrams
- Use descriptive link text instead of "click here"
- Structure content with proper heading hierarchy
- Consider users with different experience levels

## Upgrade Guide Standards

### Core Rules

- **Never retroactively update** upgrade guides - they represent historical snapshots
- **Deprecations in current release** → documented as removals in next major release upgrade guide
- **Create unreleased guides** immediately when deprecations are introduced

### File Conventions

- **Structure**: `docs/upgrade-guide/v[X].0.mdx`
- **Sidebar positions**: Subtract 1 from lowest existing number for new guides

**Frontmatter**:

```txt
---
title: Version [X].0 [(Unreleased)]
sidebar_position: [number]
id: upgrade-guide-v[X].0  # Optional, for older versions
---
```

**Unreleased admonition** (exact text):

```txt
:::info

**This version has not been released yet.**

To prevent information redundancy across upgrade guide pages, deprecation notices within Recyclarr
are systematically linked to the upgrade guide for the forthcoming unreleased major version. This
strategy serves as a living document that details all anticipated breaking changes, providing users
with adequate time to make necessary modifications prior to the implementation of these changes.

:::
```

### Content Structure

1. **Opening Statement**: "Features have been removed *or* behavior changed. Most items would have
   been deprecated in the past. Deprecations are mentioned in release notes."
2. **Breaking Changes Sections**: Use descriptive headers with anchor IDs (`{#section-id}`)
3. **Migration Examples**: Provide before/after YAML with `# <<< RENAMED` comments
4. **Cross-References**: Link to configuration pages and CLI commands
5. **File Structure Changes**: Use tree diagrams when moving directories/files

### Documentation Patterns

- Show complete configuration examples (not snippets)
- Include validation steps and expected results
- Address common migration pitfalls
- Link deprecation notices to unreleased upgrade guides
- Maintain consistent terminology across related documentation

## Dependencies

### Core

- Docusaurus 3.8 with TypeScript configuration
- React 19 with MDX support
- Node.js >=22.0.0 required

### Extensions

- Algolia search integration
- Iconify React for icon components
- GitHub codeblock theme with source linking
- MDX checker for content validation
