---
id: features
title: Features
sidebar_position: 2
---

A comprehensive list of features in Recyclarr.

## Custom Formats

- A user-specified list of custom formats are synchronized to Sonarr from the TRaSH guides.
- Scores from the guides can be synchronized to quality profiles of your choosing.
- User can specify their own scores for custom formats (instead of using the guide score).
- Option to enable automatic deletion custom formats in Sonarr when they are removed from config or
  the guide.

## Quality Profiles

- Create and modify quality profiles.
- Compatible with Sonarr v3.
- Sync profile fields: "Upgrade Allowed", "Upgrade Until Custom Format Score", "Upgrade Until
  Quality", "Minimum Custom Format Score".
- Sync Qualities and Quality Groups.
- Option to choose multiple sort algorithms for qualities.

## Quality Definitions

- Guide-provided quality definitions, such as Anime, Series (Non-Anime), and Movies.

## Release Profiles

:::info

Sonarr v3 Only

:::

- "Preferred", "Must Not Contain", and "Must Contain" terms from guides are reflected in
  corresponding release profile fields in Sonarr.
- "Include Preferred when Renaming" is properly checked/unchecked depending on explicit mention of
  this in the guides.
- Release Profiles get created if they do not exist, or updated if they already exist.
- Tags can be added to any updated or created profiles. Tags are created for you if they do not
  exist.
- Ability to convert preferred with negative scores to "Must not contain" terms.
- Terms mentioned as "optional" in the guide can be selectively included or excluded; based entirely
  on user preference.
- Convenient command line options to get information from the guide to more easily add it to your
  YAML configuration.

## Command Line Operations

- A `list` command for showing available custom formats, release profiles, and quality definitions
  available in the TRaSH Guides.
- A `delete` command providing ways to delete stuff from Radarr & Sonarr, such as custom formats.
- A `config` command for managing configuration YAML files, including creating new configuration
  files from pre-made templates.

## YAML Features

- Use environment variables in your configuration via `!env_var`.
- Specify and store secret values (such as API keys) using `!secret`.
- Decompose YAML into multiple, reusable files via a YAML include feature.
