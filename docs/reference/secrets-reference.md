---
id: secrets-reference
title: Secrets YAML Reference
---

Recyclarr can substitute secret values within your YAML configuration files. This keeps sensitive
values out of your configuration files and enables configuration sharing without you having to
remember to manually redact each time.

:::note Version Requirement

Secrets functionality was added as optional functionality in `v3.0.0`.

:::

Specify secrets with a `secrets.yml` located in your
[recyclarr configuration directory](/file-structure.md#appdata-directory).

The following rules apply:

- Secrets can be used in both the Recyclarr config and settings files.
- Only one secrets file is supported.
- This file is optional and does not need to exist in order for Recyclarr to work properly.

## Secrets Definition

Define secrets in `secrets.yml` using key/value pairs. Keys can be whatever you want and each key
must be unique. An example `secrets.yml`:

```yml
sonarr_baseurl: http://localhost:8989
sonarr_apikey: f7e74ba6c80046e39e076a27af5a8444
radarr4k_url: http://localhost:7878
radarr4k_apikey: bf99da49d0b0488ea34e4464aa63a0e5
```

## Using Secrets

Substitute secrets within your Recyclarr configuration or settings files using `!secret <key_name>`.
Reccylarr will fail while loading your configuration if there are references to keys that don't
exist in the `secrets.yml`. An excerpt from an example `recyclarr.yml`:

```yml
radarr:
  - base_url: !secret radarr4k_url
    api_key: !secret radarr4k_apikey
```
