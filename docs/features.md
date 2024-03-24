---
id: features
title: Features
sidebar_position: 2
---

## Compatibility

Recyclarr is compatible with the following services and versions.

| Service | Minimum Version |
| ------- | --------------- |
| Sonarr  | `v4.0.0`        |
| Radarr  | `v3.0.0`        |

:::info

Sonarr v3 is no longer supported by Recyclarr starting with version v7.0!

:::

## Supported Features

A comprehensive list of features in Recyclarr.

### Custom Formats

- A user-specified list of custom formats are synchronized to Sonarr from the TRaSH guides.
- Scores from the guides can be synchronized to quality profiles of your choosing.
- User can specify their own scores for custom formats (instead of using the guide score).
- Option to enable automatic deletion custom formats in Sonarr when they are removed from config or
  the guide.

### Quality Profiles

- Create and modify quality profiles.
- Sync profile fields: "Upgrade Allowed", "Upgrade Until Custom Format Score", "Upgrade Until
  Quality", "Minimum Custom Format Score".
- Sync Qualities and Quality Groups.
- Option to choose multiple sort algorithms for qualities.

### Quality Definitions

- Guide-provided quality definitions, such as Anime, Series (Non-Anime), and Movies.

### Media Naming

- Sync media naming formats from the guides, such as file and folder naming.
- Ability to exclude sync for specific naming formats to manage them manually.
- Preview functionality to show what will be synced before doing it.

### Command Line Operations

- A `list` command for showing available custom formats, media naming formats, and quality
  definitions available in the TRaSH Guides.
- A `delete` command providing ways to delete stuff from Radarr & Sonarr, such as custom formats.
- A `config` command for managing configuration YAML files, including creating new configuration
  files from pre-made templates.

### YAML Features

- Use environment variables in your configuration via `!env_var`.
- Specify and store secret values (such as API keys) using `!secret`.
- Decompose YAML into multiple, reusable files via a YAML include feature.
