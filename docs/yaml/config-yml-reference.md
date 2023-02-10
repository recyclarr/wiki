---
id: config-reference
title: Configuration YAML
sidebar_position: 2
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

## All Services

The below settings are applicable to both Sonarr and Radarr.

### Basic Settings {#basic}

```yml
service_type:
  instance_name:
    base_url: http://localhost:1234
    api_key: f7e74ba6c80046e39e076a27af5a8444
```

- `service_type`<br/>
  Must be one of `sonarr` or `radarr`. The service type will correspond to one of the more specific
  sections later on. Each service type may be configured in different ways.

- `instance_name`<br/>
  A custom name used to identify this particular instance. This name must meet the following
  requirements:

  - Must contain only numbers, letters, and underscores (`_`).
  - Must be unique across all other Sonarr instances in your YAML config.

  The purpose of the name is to be human readable and self-documenting. It is used in different
  ways:

  - In log messages to more easily point out where issues are in your configuration.
  - **(In the future)** On the CLI it allows executing actions against specific instances.

- `base_url` **(Required)**<br/>
  The base URL of your instance. Basically this is the URL you bookmark to get to the front page.

- `api_key` **(Required)**<br/>
  The API key that Recyclarr should use to synchronize settings to your instance. You can obtain
  your API key by going to `Settings > General` and copy & paste the "API Key" under the "Security"
  group/header.

### Custom Format Settings {#custom-format-settings}

:::caution

For Sonarr: version 4 or greater is **required** for Custom Format support to work.

:::

For details on the way Custom Formats are synchronized, visit the [Custom Format
Synchronization][cfsync] page.

[cfsync]: /behavior/custom-formats.md

- `delete_old_custom_formats` (Optional; *Default: `false`*)<br/>
  If enabled, custom formats that you remove from your YAML configuration OR that are removed from
  the guide will be deleted from your Radarr instance. Note that this *only* applies to custom
  formats that Recyclarr has synchronized to Radarr. Custom formats that you have added manually in
  Radarr **will not be deleted** if you enable this setting.

- `custom_formats` (Optional; *Default: No custom formats are synced*)<br/>
  A list of one or more sets of custom formats each with an optional set of quality profiles ids
  that identify which quality profiles to assign the scores for those custom formats to. The child
  properties documented below apply to each element of this list.

  - `trash_ids` **(Required)**<br/>
    A list of one or more Trash IDs of custom formats to synchronize. There are a couple of ways to
    obtain Trash IDs (listed in order of preference below). The Trash ID itself is a hash of
    hexadecimal characters, like `496f355514737f7d83bf7aa4d24f8169`.

    - Most custom format pages in the TRaSH Guides (like [this one][guidecfs]) have either tables
      (with a Trash ID column) or a expandable "JSON" section. You can use these to obtain the Trash
      ID value.
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
    - It's OK for the same custom format to exist in multiple lists of `trash_ids`. Recyclarr will
      only ever synchronize it once. Allowing it to be specified multiple times allows you to assign
      it to different profiles with different scores.

    :::

  - `quality_profiles` (Optional; *Default: No quality profiles are changed*)<br/>
    One or more quality profiles to update with the scores from the custom formats listed above.
    Scores are taken from the guide by default, with an option to override the score for all of
    them. Each object in the list must use the properties below.

    - `name` **(Required)**<br/>
      The name of one of the quality profiles in Radarr.

    - `score` (Optional; *Default: Use scores from the guide*)<br/>
      A positive or negative number representing the score to apply to *all* custom formats listed
      in the `trash_ids` list. A score of `0` is also acceptable, which effectively disables the custom
      formats without having to delete them.

    - `reset_unmatched_scores` (Optional; *Default: `false`*)<br/>
      If set to `true`, enables setting scores to `0` in quality profiles where either a name was
      not mentioned in the `trash_ids` array *or* it was in that list but did not get a score (e.g. no
      score in guide). If `false`, scores are never altered unless it is listed in the `trash_ids` array
      *and* has a valid score to assign.

[guidecfs]: https://trash-guides.info/Radarr/Radarr-collection-of-custom-formats/
[listcfs]: /cli/list/list-custom-formats.md
[radarrjson]: https://github.com/TRaSH-/Guides/tree/master/docs/json/radarr/cf

### Quality Definition Settings {#quality-def-settings}

- `quality_definition` (Optional)<br/>
  Specify information related to quality definition processing here. Only the following child
  properties are permitted. If not specified, no quality definitions will be synced.

  - `type` **(Required)**<br/>
    A quality definition type found by using the [`list qualities` command][listqualities]. The type
    specified here identifies the quality size settings that should be parsed and uploaded to your
    Sonarr or Radarr instance.

  - `preferred_ratio` (Optional; *Default: use guide values*)<br/>
    A value `0.0` to `1.0` that represents the percentage (interpolated) position of that middle
    slider you see when you enable advanced settings on the Quality Definitions page in Radarr or
    Sonarr. A value of `0.0` means the preferred quality will match the minimum quality. Likewise,
    `1.0` will match the maximum quality. A value such as `0.5` will keep it halfway between the
    two.

    :::info Behavioral Notes

    - Any value less than `0` or greater than `1` will result in a warning log printed and the value
      will be clamped.
    - Using this property on a Sonarr v3 instance does nothing, since older versions of Sonarr only
      have min/max values and no preferred.

    :::

[listqualities]: /cli/list/list-qualities.md

## Sonarr

```yml
sonarr:
  instance_name:
    base_url: http://localhost:8989
    api_key: f7e74ba6c80046e39e076a27af5a8444

    # Quality Definition Settings
    quality_definition:
      type: series

    # Release Profile Settings
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

### Custom Format Settings

:::caution

Sonarr version 4 or greater is **required** for Custom Format support to work.

:::

See the [Custom Format Settings](#custom-format-settings) section under "All Services" at the top
for more information.

### Quality Definition Settings

See the [Quality Definition Settings](##quality-def-settings) section under "All Services" at the
top for more information.

### Release Profile Settings

:::caution 💀 Deprecation Notice 💀

Release Profiles are deprecated and may not be used in Sonarr version 4 or greater!

:::

- `release_profiles` (Optional; *Default: No release profiles are synced*)<br/>
  A list of release profiles to parse from the guide. Each object in this list supports the below
  properties.

  - `trash_ids` **(Required)**<br/>
    A list of one or more Trash IDs taken from the output of the [`list release-profiles`
    command][listrps].

  - `strict_negative_scores` (Optional; *Default: `false`*)<br/>
    Enables preferred term scores less than 0 to be instead treated as "Must Not Contain" (ignored)
    terms. For example, if something is "Preferred" with a score of `-10`, it will instead be put in
    the "Must Not Contains" section of the uploaded release profile. Must be `true` or `false`.

  - `tags` (Optional; *Default: Empty list*)<br/>
    A list of one or more strings representing tags that will be applied to this release profile.
    Tags are created in Sonarr if they do not exist. All tags on an existing release profile (if
    present) are removed and replaced with only the tags in this list. If no tags are specified, no
    tags will be set on the release profile.

  - `filter` (Optional)<br/>
    Defines various ways that release profile terms from the guide are synchronized with Sonarr. Any
    filters below that takes a list of `trash_id` values, those values come, from the [same list
    command][listrps], but with the `--terms` option used. There is a `trash_id` field next to each
    `term` field; that is what you use.

    - `include`<br/>
      A list of `trash_id` values representing terms (Required, Ignored, or Preferred) that should
      be included in the created Release Profile in Sonarr. Terms that are NOT specified here are
      excluded automatically. Not compatible with `exclude` and will take precedence over it.

    - `exclude`<br/>
      A list of `trash_id` values representing terms (Required, Ignored, or Preferred) that should
      be excluded from the created Release Profile in Sonarr. Terms that are NOT specified here are
      included automatically. Not compatible with `include`; this list is not used if it is present.

[listrps]: /cli/list/list-release-profiles.md

## Radarr

```yml
radarr:
  instance_name:
    base_url: http://localhost:7878
    api_key: bf99da49d0b0488ea34e4464aa63a0e5

    # Quality Definition Settings
    quality_definition:
      type: movie
      preferred_ratio: 0.5

    # Custom Format Settings
    delete_old_custom_formats: false
    custom_formats:
      - trash_ids:
          - ed38b889b31be83fda192888e2286d83 #BR-DISK
          - 90cedc1fea7ea5d11298bebd3d1d3223 #EVO (no WEBDL)
          - 90a6f9a284dff5103f6346090e6280c8 #LQ
          - dc98083864ea246d05a42df0d05f81cc #x265 (720/1080p)
          - b8cd450cbfa689c0259a01d9e29ba3d6 #3D
          - ae9b7c9ebde1f3bd336a8cbd1ec4c5e5 #No-RlsGroup
          - 7357cf5161efbf8c4d5d0c30b4815ee2 #Obfuscated
          - 5c44f52a8714fdd79bb4d98e2673be1f #Retags
          - b6832f586342ef70d9c128d40c07b872 #Bad Dual Groups
          - 923b6abef9b17f937fab56cfcf89e1f1 #DV (WEBDL)
        quality_profiles:
          - name: HD-1080p
          - name: HD-720p2
            score: -1000
      - trash_ids:
          - 496f355514737f7d83bf7aa4d24f8169 #TrueHD ATMOS
          - 2f22d89048b01681dde8afe203bf2e95 #DTS X
        quality_profiles:
          - name: SD
```

### Custom Format Settings

See the [Custom Format Settings](#custom-format-settings) section under "All Services" at the top
for more information.

### Quality Definition Settings

See the [Quality Definition Settings](##quality-def-settings) section under "All Services" at the
top for more information.
