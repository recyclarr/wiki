---
id: release-profiles
title: recyclarr list release-profiles
---

## Usage

```js
recyclarr list release-profiles [OPTIONS]
```

## Description

Prints a list of all [available Sonarr Release Profiles][sonarrjson] from the TRaSH Guides in YAML
format, ready to be copied & pasted directly into your `recyclarr.yml` file. Here is an example of
the output you will see:

```txt
List of Release Profiles in the TRaSH Guides:

          - EBC725268D687D588A20CBC5F97E538B # Low Quality Groups
          - 76e060895c5b8a765c310933da0a5357 # Optionals
          - 71899E6C303A07AF0E4746EFF9873532 # P2P Groups + Repack/Proper
          - 1B018E0C53EC825085DD911102E2CA36 # Release Sources (Streaming Service)
          - d428eda85af1df8904b4bbe4fc2f537c # Anime - First release profile
          - 6cd9e10bb5bb4c63d2d7cd3279924c7b # Anime - Second release profile

The above Release Profiles are in YAML format and ready to be copied & pasted under the `trash_ids:` property.
```

You can copy & paste these directly into your `recyclarr.yml` like this:

```yml
sonarr:
  main:
    base_url: http://127.0.0.1:8989/sonarr
    api_key: 2424b3643507485ea2e06382d3f0b8a3
    release_profiles:
      - trash_ids:
          - d428eda85af1df8904b4bbe4fc2f537c # Anime - First release profile
          - 6cd9e10bb5bb4c63d2d7cd3279924c7b # Anime - Second release profile
```

## Options

Also visit [Common Options](../common.md) to read about options usable by all commands.

### `--terms` {#terms}

Prints a list of all terms (that have been assigned their own Trash IDs) for the Release Profile
with the specified Trash ID. Run the `release-profiles` command without the `--terms` option first
to get a list of the [available Sonarr Release Profiles][sonarrjson] from the TRaSH Guides. Copy one
of the Trash ID values from there and provide it as the argument to this command to get its list of
terms. The terms are printed in YAML format, ready to be copied & pasted directly into your
`recyclarr.yml` file. Here is an example of the output you will see:

```txt
List of Terms for the 'Optionals' Release Profile that may be filtered:

Ignored Terms:

            - cec8880b847dd5d31d29167ee0112b57 # Golden rule
            - 436f5a7d08fbf02ba25cb5e5dfe98e55 # Ignore Dolby Vision without HDR10 fallback.
            - f3f0f3691c6a1988d4a02963e69d11f2 # Ignore The Group -SCENE
            - 5bc23c3a055a1a5d8bbe4fb49d80e0cb # Ignore so called scene releases

Preferred Terms:

            - ea83f4740cec4df8112f3d6dd7c82751 # Prefer Season Packs
            - bc7a6383cbe88c3ee2d6396e1aacc0b3 # Prefer HDR
            - fa47da3377076d82d07c4e95b3f13d07 # Prefer Dolby Vision
            - 6f2aefa61342a63387f2a90489e90790 # Dislike retags: rartv, rarbg, eztv, TGx
            - 19cd5ecc0a24bf493a75e80a51974cdd # Dislike retagged groups
            - 6a7b462c6caee4a991a9d8aa38ce2405 # Dislike release ending: en
            - 236a3626a07cacf5692c73cc947bc280 # Dislike release containing: 1-

The above Term Filters are in YAML format and ready to be copied & pasted under the `include:` or `exclude:` filter properties.
```

You can copy & paste the lists above directly into your YAML under the desired `include:` or
`exclude:` filter sections. See the example below.

```yml
sonarr:
  main:
    base_url: http://127.0.0.1:8989/sonarr
    api_key: 2424b3643507485ea2e06382d3f0b8a3
    release_profiles:
      - trash_ids: [76e060895c5b8a765c310933da0a5357] # Optionals
        filter:
          include:
            - 436f5a7d08fbf02ba25cb5e5dfe98e55 # Ignore Dolby Vision without HDR10 fallback
            - f3f0f3691c6a1988d4a02963e69d11f2 # Ignore The Group -SCENE
```

[sonarrjson]: https://github.com/TRaSH-/Guides/tree/master/docs/json/sonarr/rp
