---
id: file-structure
title: File Structure
---

This page describes the general file structure used by Recyclarr for its data. Many of these are
platform-specific.

## Application Data Directory {#appdata-directory}

The application data directory is the root location for Recyclarr's files. Everything that Recyclarr
reads or writes, by default, starts with this path.

| Platform | Location                                  |
| -------- | ----------------------------------------- |
| Windows  | `%APPDATA%\recyclarr`                     |
| Linux    | `~/.config/recyclarr`                     |
| MacOS    | `~/Library/Application Support/recyclarr` |
| Docker   | `/config`                                 |

## Default YAML Configuration Files {#default-yaml}

Configuration files may be located in multiple places, each documented in the sections that follow.
For all supported locations, the following behavior applies:

- All methods may be used together and all corresponding YAML files will be loaded.
- You don't have to use all locations; you can choose only the ones you want to use.
- If at least one configuration file is not found, it will result in an error.
- All YAML files must have the `yml` or `yaml` extension.

### File: `recyclarr.yml` {#recyclarr-yaml}

The default YAML configuration file is named `recyclarr.yml` and it is always located in the
application data directory (listed above based on platform). Example (using docker path):

```txt
/config/recyclarr.yml
```

### Directory: `configs` {#config-directory}

Under the application data directory, there is a subdirectory named `configs` in which you can place
any number of configuration YAML files. This system works especially well in Docker, where you don't
really have an easy way to specify custom CLI arguments. The following requirements must be met:

- All files must have the `.yml` or `.yaml` extension in order to be recognized.
- Every single YAML file placed here will be loaded as if every file were specified in the
  `--config` command line argument. This behavior is non-recursive; meaning if you place YAML files
  in subdirectories under `configs/`, they will not be loaded.
- The names of the files are unimportant and can be whatever you want.

:::caution

Include templates should *not* be placed here; use the [`includes`](#include-directory) directory
instead.

:::

## Include Templates Directory {#include-directory}

import IncludeDirectory from './_include-templates-dir.md'

<IncludeDirectory />
