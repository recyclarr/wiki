---
id: secrets-reference
title: Secrets
sidebar_position: 4
---

Recyclarr can substitute secret values within your YAML configuration files. This keeps sensitive
values out of your configuration files and enables configuration sharing without you having to
remember to manually redact each time.

Specify secrets with a `secrets.yml` located in your [application data directory][appdata].

[appdata]: /file-structure.md#appdata-directory

The following rules apply:

- Secrets can be used in both the Recyclarr config and settings files.
- Only one secrets file is supported.
- This file is optional and does not need to exist in order for Recyclarr to work properly.

## Secrets Definition

Define secrets in `secrets.yml` using key/value pairs. An example `secrets.yml`:

```yml
sonarr_some_url: http://localhost:8989
sonarr_some_apikey: f7e74ba6c80046e39e076a27af5a8444
radarr4k_another_url: http://localhost:7878
radarr4k_another_apikey: bf99da49d0b0488ea34e4464aa63a0e5
```

### Naming Rules

- Keys can be named whatever you want.
- All key names must be unique. In other words, two keys cannot have the same name.

## Using Secrets

Substitute secrets within your Recyclarr configuration or settings files using `!secret <key_name>`.
Usage example in `recyclarr.yml` (using the same `secrets.yml` example from the previous section):

```yml
radarr:
  radarr4k:
    base_url: !secret radarr4k_another_url
    api_key: !secret radarr4k_another_apikey
```

:::caution

Recyclarr will fail to load your configuration if there are references to keys that don't exist in
the `secrets.yml`.

:::

## Implicitly Set Base URL and API Key {#implicit-url-key}

The [`base_url`][base_url] and [`api_key`][api_key] properties of each of your instance
configurations can be implicitly set by following a naming convention for certain secrets:

- Base URL: `<instance_name>_base_url`
- API Key: `<instance_name>_api_key`

Where `<instance_name>` is the [name of the instance][instance_name] in your YAML file.

[base_url]: /yaml/config-yml-reference.md#basic-base-url
[api_key]: /yaml/config-yml-reference.md#basic-api-key
[instance_name]: /yaml/config-yml-reference.md#basic-instance-name

### Order of Precedence {#implicit-key-url-precedence}

If your configuration YAML file has an explicitly set `api_key` or `base_url`, those values *always*
take precedence over any corresponding implicitly specified values in your `secrets.yml`. In other
words, the secret values will *only* be used if you don't have them in your configuration file.

### Example {#implicit-key-url-example}

Suppose we have the following basic YAML configuration file:

```yml
radarr:
  instance1:
    base_url: http://localhost:7878
    api_key: 2424b3643507485ea2e06382d3f0b8a3

    quality_definition:
      type: movie

    delete_old_custom_formats: true
    replace_existing_custom_formats: true

    custom_formats:
      - trash_ids:
          # Audio Advanced #2
          - 240770601cc226190c367ef59aba7463 # AAC
          - c2998bd0d90ed5621d8df281e839436e # DD
          - 8e109e50e0a0b83a5098b056e13bf6db # DTS-HD HRA
```

To have `base_url` and `api_key` implicitly set, so that I do not need to have them explicitly set
in my configuration YAML, I define the following two secret values:

```yml
# secrets.yml
instance1_base_url: http://localhost:7878
instance1_api_key: 2424b3643507485ea2e06382d3f0b8a3
```

After this, I delete the `api_key` and `base_url` properties in your configuration YAML. So our
example would now look like this:

```yml
radarr:
  instance1:
    # There should be no `api_key` or `base_url` here

    quality_definition:
      type: movie

    delete_old_custom_formats: true
    replace_existing_custom_formats: true

    custom_formats:
      - trash_ids:
          # Audio Advanced #2
          - 240770601cc226190c367ef59aba7463 # AAC
          - c2998bd0d90ed5621d8df281e839436e # DD
          - 8e109e50e0a0b83a5098b056e13bf6db # DTS-HD HRA
```
