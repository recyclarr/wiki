---
id: config-reference
title: Configuration
sidebar_position: 1
---

The Recyclarr program utilizes YAML for its configuration files. The configuration can be set up
multiple ways, offering a lot of flexibility:

- You may use one or more YAML files simultaneously, allowing you to divide your configuration
  properties up in such a way that you can control what gets updated based on which files you
  specify.

- Each YAML file may have one or more service configurations. This means you can have one file
  define settings for Sonarr, Radarr, or both services. The program will only read the configuration
  from the file relevant for the specific service command you specified (e.g. `recyclarr sync
  sonarr` will only read the Sonarr config in the file, even if Radarr config is present).

- Use [a `secrets.yml` file](/yaml/secrets-reference.md) to keep sensitive values out of your
  configuration files. This prevents accidentally sharing api_keys and other sensitive values when
  sharing configurations.

For various examples, see the [Configuration Examples] page.

[Configuration Examples]: /yaml/configuration-examples.md

:::tip Remember

If you do not specify the `--config` argument, the program will look for default configuration files
according to the rules documented on [the file structure](../file-structure.md#default-yaml) page.

:::

## Schema Validation {#schema}

Visit the [Schema Validation](/schema-validation.md) page for detailed instructions.

Add this comment to the top of your YAML file:

```yml
# yaml-language-server: $schema=https://raw.githubusercontent.com/recyclarr/recyclarr/master/schemas/config-schema.json
```

## Basic Setup {#basic}

| Service     |                        Supported                         |
| ----------- | :------------------------------------------------------: |
| Sonarr (v3) | <icon icon="mdi:check-bold" height="24" color="green" />  |
| Sonarr (v4) | <icon icon="mdi:check-bold" height="24" color="green" /> |
| Radarr      | <icon icon="mdi:check-bold" height="24" color="green" /> |

```yml
service_type:
  instance_name:
    base_url: http://localhost:1234
    api_key: f7e74ba6c80046e39e076a27af5a8444
```

### `service_type` {#basic-service-type}

**Required.**

Must be one of `sonarr` or `radarr`. The service type will correspond to one of the more specific
sections later on. Each service type may be configured in different ways.

### `instance_name` {#basic-instance-name}

**Required.**

A custom name used to identify this particular instance. This name must meet the following
requirements:

- Must contain only numbers, letters, and underscores (`_`).
- Must be unique across all other Sonarr instances in your YAML config.

The purpose of the name is to be human readable and self-documenting. It is used in different ways:

- In log messages to more easily point out where issues are in your configuration.
- On the CLI, it allows executing actions against specific instances.

### `base_url` {#basic-base-url}

**Required.**

The base URL of your instance. Basically this is the URL you bookmark to get to the front page. Must
begin with `http` or `https`.

:::tip

This property can be implicitly set via secrets if you follow a naming convention. See the
[Secrets][impliciturlkey] page for more details.

:::

:::caution

The `base_url` value is used to uniquely identify an instance of a service (such as Radarr). This
means that if you relocate your instances to a new URL (change of port, hostname, or path),
Recyclarr *will think this is a completely different instance*. This has implications with regards
to [caching].

[caching]: /behavior/cache.md#relocating

:::

### `api_key` {#basic-api-key}

**Required.**

The API key that Recyclarr should use to synchronize settings to your instance. You can obtain your
API key by going to `Settings > General` and copy & paste the "API Key" under the "Security"
group/header.

:::tip

This property can be implicitly set via secrets if you follow a naming convention. See the
[Secrets][impliciturlkey] page for more details.

:::

[impliciturlkey]: /yaml/secrets-reference.md#implicit-url-key

## Custom Formats {#custom-format-settings}

| Service     |                        Supported                         |
| ----------- | :------------------------------------------------------: |
| Sonarr (v3) | <icon icon="mdi:close-thick" height="24" color="red" />  |
| Sonarr (v4) | <icon icon="mdi:check-bold" height="24" color="green" /> |
| Radarr      | <icon icon="mdi:check-bold" height="24" color="green" /> |

```yml
# See "Basic Setup" for `service_type` and `instance_name`
service_type:
  instance_name:
    # Custom Format Configuration
    delete_old_custom_formats: false
    replace_existing_custom_formats: false
    custom_formats:
      - trash_ids:
          - ed38b889b31be83fda192888e2286d83 # BR-DISK
          - 90cedc1fea7ea5d11298bebd3d1d3223 # EVO (no WEBDL)
          - 90a6f9a284dff5103f6346090e6280c8 # LQ
          - dc98083864ea246d05a42df0d05f81cc # x265 (720/1080p)
        quality_profiles:
          - name: HD-1080p
          - name: HD-720p
            score: -1000
      - trash_ids:
          - 496f355514737f7d83bf7aa4d24f8169 # TrueHD ATMOS
          - 2f22d89048b01681dde8afe203bf2e95 # DTS X
        quality_profiles:
          - name: SD
```

For details on the way Custom Formats are synchronized, visit the [Custom Format
Synchronization][cfsync] page.

[cfsync]: /behavior/custom-formats.md

### `delete_old_custom_formats` {#cf-delete-old-custom-formats}

**Optional.** *Default: `false`*

If enabled, custom formats that you remove from your YAML configuration OR that are removed from the
guide will be deleted from your Radarr instance.

:::info

This *only* applies to custom formats that Recyclarr has synchronized to Radarr. Custom formats that
you have added manually in Radarr **will not be deleted** if you enable this setting.

:::

### `replace_existing_custom_formats` {#cf-replace-existing-custom-formats}

**Optional.** *Default: `false`*

If enabled (set to `true`), custom formats matching the guide are always synced to the service,
replacing any existing CFs with the same name, whether you created them or not. This means that if
you manually create a CF from the guide and make adjustments to it, *those changes will be
overwritten*. If this property is omitted *or* you specify `false`, then Recyclarr will skip custom
formats that you've manually created from the guide. In other words, it will only touch custom
formats that it created to begin with.

### `custom_formats` {#cf-custom-formats}

**Optional.** *Default: No custom formats are synced*

A list of one or more sets of custom formats each with an optional set of quality profiles names
that identify which quality profiles to assign the scores for those custom formats to. The child
properties documented below apply to each element of this list.

### `trash_ids` {#cf-trash-ids}

**Required.**

A list of one or more Trash IDs of custom formats to synchronize. There are a couple of ways to
obtain Trash IDs (listed in order of preference below). The Trash ID itself is a hash of hexadecimal
characters, like `496f355514737f7d83bf7aa4d24f8169`.

- Most custom format pages in the TRaSH Guides (like [this one][guidecfs]) have either tables (with
  a Trash ID column) or a expandable "JSON" section. You can use these to obtain the Trash ID value.
- From Recyclarr itself using the [`list custom-formats` command][listcfs].
- Taken from the value of the `"trash_id"` property directly in the [TRaSH Guide JSON
  files][radarrjson] itself.

:::tip

To ease the readability concerns of using IDs, leave a comment beside the Trash ID in your
configuration so it can be easily identified later. If you use [`list custom-formats`][listcfs],
comments are added for you. For example:

```yml
trash_ids:
- 5d96ce331b98e077abb8ceb60553aa16 # dovi
- a570d4a0e56a2874b64e5bfa55202a1b # flac
```

:::

:::info A Few Things to Remember

- If `delete_old_custom_formats` is set to true, custom formats are **deleted** in Radarr if you
  remove them from this list.
- It's OK for the same custom format to exist in multiple lists of `trash_ids`. Recyclarr will only
  ever synchronize it once. Allowing it to be specified multiple times allows you to assign it to
  different profiles with different scores.

:::

### `quality_profiles` {#cf-quality-profiles}

**Optional.** *Default: No quality profiles are changed*

One or more quality profiles to update with the scores from the custom formats listed above. Scores
are taken from the guide by default, with an option to override the score for all of them. Each
object in the list must use the properties below.

- `name` **(Required)**<br/>
  The name of one of the quality profiles in Radarr.

- `score` (Optional; *Default: Use scores from the guide*)<br/>
  A positive or negative number representing the score to apply to *all* custom formats listed in
  the `trash_ids` list. A score of `0` is also acceptable, which effectively disables the custom
  formats without having to delete them.

[guidecfs]: https://trash-guides.info/Radarr/Radarr-collection-of-custom-formats/
[listcfs]: /cli/list/list-custom-formats.md
[radarrjson]: https://github.com/TRaSH-/Guides/tree/master/docs/json/radarr/cf

## Quality Definition {#quality-def-settings}

| Service     |                        Supported                         |
| ----------- | :------------------------------------------------------: |
| Sonarr (v3) | <icon icon="mdi:check-bold" height="24" color="green" /> |
| Sonarr (v4) | <icon icon="mdi:check-bold" height="24" color="green" /> |
| Radarr      | <icon icon="mdi:check-bold" height="24" color="green" /> |

```yml
# See "Basic Setup" for `service_type` and `instance_name`
service_type:
  instance_name:
    # Quality Definition Configuration
    quality_definition:
      type: series
      preferred_ratio: 0.5
```

**Optional.** *Default: No quality definitions are modified*

Specify information related to quality definition processing here. Only the following child
properties are permitted. If not specified, no quality definitions will be synced.

### `type` {#qd-type}

**Required.**

A quality definition type found by using the [`list qualities` command][listqualities]. The type
specified here identifies the quality size settings that should be parsed and uploaded to your
Sonarr or Radarr instance.

### `preferred_ratio` {#qd-preferred-ratio}

**Optional.** *Default: use guide values*

A value `0.0` to `1.0` that represents the percentage (interpolated) position of that middle slider
you see when you enable advanced settings on the Quality Definitions page in Radarr or Sonarr. A
value of `0.0` means the preferred quality will match the minimum quality. Likewise, `1.0` will
match the maximum quality. A value such as `0.5` will keep it halfway between the two.

:::info Behavioral Notes

- Any value less than `0` or greater than `1` will result in a warning log printed and the value
  will be clamped.
- Using this property on a Sonarr v3 instance does nothing, since older versions of Sonarr only have
  min/max values and no preferred.

:::

[listqualities]: /cli/list/list-qualities.md

## Quality Profiles {#quality-profiles}

| Service     |                        Supported                         |
| ----------- | :------------------------------------------------------: |
| Sonarr (v3) | <icon icon="mdi:close-thick" height="24" color="red" />  |
| Sonarr (v4) | <icon icon="mdi:check-bold" height="24" color="green" /> |
| Radarr      | <icon icon="mdi:check-bold" height="24" color="green" /> |

```yml
# See "Basic Setup" for `service_type` and `instance_name`
service_type:
  instance_name:
    # Quality Profile Configuration
    quality_profiles:
      - name: SD
        reset_unmatched_scores: true
```

**Optional.** *Default: No quality profiles are modified*

An array of quality profiles that exist in the remote service along with any configuration
properties that Recyclarr should use to modify that quality profile.

:::info

Recyclarr **does not** create quality profiles!

:::

### `name` {#qp-name}

**Required.**

The name of the quality profile to which settings should apply.

### `reset_unmatched_scores` {#qp-reset-unmatched-scores}

**Optional.** *Default: `false`*

If set to `true`, sets *all* custom format scores to `0` (including those CFs you may be managing
manually!) in corresponding quality profiles where those CFs are not in the `trash_ids` array *or*
did not get a score (e.g. no score in guide). If `false`, scores are never altered unless it is
listed in the `trash_ids` array *and* has a valid score to assign (either from the guide or via an
explicit `score`).

## Release Profiles {#release-profiles}

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

:::caution

Release Profiles may not be used in Sonarr version 4 or greater!

:::

A list of release profiles to parse from the guide. Each object in this list supports the below
properties.

### `trash_ids` {#rp-trash-ids}

**Required.**

A list of one or more Trash IDs taken from the output of the [`list release-profiles`
command][listrps].

### `strict_negative_scores` {#rp-strict-negative-scores}

**Optional.** *Default: `false`*

Enables preferred term scores less than 0 to be instead treated as "Must Not Contain" (ignored)
terms. For example, if something is "Preferred" with a score of `-10`, it will instead be put in the
"Must Not Contains" section of the uploaded release profile. Must be `true` or `false`.

### `tags` {#rp-tags}

**Optional.** *Default: Empty list*

A list of one or more strings representing tags that will be applied to this release profile. Tags
are created in Sonarr if they do not exist. All tags on an existing release profile (if present) are
removed and replaced with only the tags in this list. If no tags are specified, no tags will be set
on the release profile.

### `filter` {#rp-filter}

**Optional.**

Defines various ways that release profile terms from the guide are synchronized with Sonarr. Any
filters below that takes a list of `trash_id` values, those values come, from the [same list
command][listrps], but with the `--terms` option used. There is a `trash_id` field next to each
`term` field; that is what you use.

- `include`<br/>
  A list of `trash_id` values representing terms (Required, Ignored, or Preferred) that should be
  included in the created Release Profile in Sonarr. Terms that are NOT specified here are excluded
  automatically. Not compatible with `exclude` and will take precedence over it.

- `exclude`<br/>
  A list of `trash_id` values representing terms (Required, Ignored, or Preferred) that should be
  excluded from the created Release Profile in Sonarr. Terms that are NOT specified here are
  included automatically. Not compatible with `include`; this list is not used if it is present.

[listrps]: /cli/list/list-release-profiles.md
