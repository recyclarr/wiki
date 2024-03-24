---
id: include
title: Include
sidebar_position: 6
---

| Service     |                        Supported                         |
| ----------- | :------------------------------------------------------: |
| Sonarr (v4) | <icon icon="mdi:check-bold" height="24" color="green" /> |
| Radarr      | <icon icon="mdi:check-bold" height="24" color="green" /> |

```yml
# See "Basic Setup" for `service_type` and `instance_name`
service_type:
  instance_name:
    # Include Configuration
    include:
      - template: uhd-bluray-web
      - config: includes/my-config.yml
```

YAML includes are a mechanism to support reusable configurations. Including YAML is the process of
taking the contents of one YAML file and merging it into the source (root) YAML.

:::info Recommended Reading

For more details about how includes and merging work, see the [Include Behavior] page.

[Include Behavior]: /behavior/include.md

:::

## `include` {#include}

**Optional.** *Default: Nothing is included.*

A sequence of include directives. There are multiple types of include directives. Each type will
have one or more properties. Use the appropriate include directive for the kind of inclusion you
wish to perform. The sequence may contain a mixture of different include directive types.

The sections that follow correlate to types of include directives.

## Config Includes {#config}

Use this directive to include YAML files on your local filesystem.

### `config`

**Required.**

An absolute or relative path to the YAML file you wish to include. Relative paths start at the
`configs` directory inside the [app data directory][appdata]

[appdata]: /file-structure.md#appdata-directory

### Examples

```yml
include:
  # An absolute include path
  - config: /home/john/my-config.yml

  # A relative include path
  # Equivalent absolute path is (on Linux):
  #   /home/john/.config/recyclarr/configs/include/my-config.yml
  - config: include/my-config.yml
```

## Template Includes {#template}

Utilize the [Configuration Templates][templates] repository to include YAML files.

[templates]: https://github.com/recyclarr/config-templates

### `template`

**Required.**

The ID of an **include template**. The corresponding YAML in the configuration templates repository
will be included. IDs matching include templates from a non-matching service type are not allowed
(e.g. trying to include a Sonarr template inside a Radarr config).

:::tip

To get a list of eligible **include templates**, see the [`config list templates` command][list].

[list]: /cli/config/list/config-list-templates.md#include

:::

### Examples

```yml
include:
  # Includes YAML templates with these IDs
  - template: radarr-quality-definition-movie
  - template: radarr-quality-profile-anime
  - template: radarr-custom-formats-anime
```
