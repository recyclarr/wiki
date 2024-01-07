---
id: release-profiles
title: Release Profiles
sidebar_position: 5
---

| Service     |                        Supported                         |
| ----------- | :------------------------------------------------------: |
| Sonarr (v3) | <icon icon="mdi:check-bold" height="24" color="green" /> |
| Sonarr (v4) | <icon icon="mdi:close-thick" height="24" color="red" />  |
| Radarr      | <icon icon="mdi:close-thick" height="24" color="red" />  |

```yml
# See "Basic Setup" for `service_type` and `instance_name`
service_type:
  instance_name:
    # Release Profile Configuration
    release_profiles:
      - trash_ids:
          - d428eda85af1df8904b4bbe4fc2f537c # Anime - First release profile
          - 6cd9e10bb5bb4c63d2d7cd3279924c7b # Anime - Second release profile
        strict_negative_scores: true
        tags: [anime]
      - trash_ids:
          - EBC725268D687D588A20CBC5F97E538B # Low Quality Groups
          - 1B018E0C53EC825085DD911102E2CA36 # Release Sources (Streaming Service)
          - 71899E6C303A07AF0E4746EFF9873532 # P2P Groups + Repack/Proper
        strict_negative_scores: false
        tags: [tv]
      - trash_ids: [76e060895c5b8a765c310933da0a5357] # Optionals
        filter:
          include:
            - 436f5a7d08fbf02ba25cb5e5dfe98e55 # Ignore Dolby Vision without HDR10 fallback
            - f3f0f3691c6a1988d4a02963e69d11f2 # Ignore The Group -SCENE
        tags: [tv]
```

**Optional.** *Default: No release profiles are synced*

:::warning

Release Profiles may not be used in Sonarr version 4 or greater!

:::

A list of release profiles to parse from the guide. Each object in this list supports the below
properties.

## `trash_ids` {#trash-ids}

**Required.**

A list of one or more Trash IDs taken from the output of the [`list release-profiles`
command][listrps].

## `strict_negative_scores` {#strict-negative-scores}

**Optional.** *Default: `false`*

Enables preferred term scores less than 0 to be instead treated as "Must Not Contain" (ignored)
terms. For example, if something is "Preferred" with a score of `-10`, it will instead be put in the
"Must Not Contains" section of the uploaded release profile. Must be `true` or `false`.

## `tags` {#tags}

**Optional.** *Default: Empty list*

A list of one or more strings representing tags that will be applied to this release profile. Tags
are created in Sonarr if they do not exist. All tags on an existing release profile (if present) are
removed and replaced with only the tags in this list. If no tags are specified, no tags will be set
on the release profile.

## `filter` {#filter}

**Optional.**

Defines various ways that release profile terms from the guide are synchronized with Sonarr. Any
filters below that takes a list of `trash_id` values, those values come, from the [same list
command][listrps], but with the `--terms` option used. There is a `trash_id` field next to each
`term` field; that is what you use.

### `include` {#filter-include}

A list of `trash_id` values representing terms (Required, Ignored, or Preferred) that should be
included in the created Release Profile in Sonarr. Terms that are NOT specified here are excluded
automatically. Not compatible with `exclude` and will take precedence over it.

### `exclude` {#filter-exclude}

A list of `trash_id` values representing terms (Required, Ignored, or Preferred) that should be
excluded from the created Release Profile in Sonarr. Terms that are NOT specified here are included
automatically. Not compatible with `include`; this list is not used if it is present.

[listrps]: /cli/list/list-release-profiles.md
