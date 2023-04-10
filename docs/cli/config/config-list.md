---
id: list
title: recyclarr config list
---

## Usage

```js
recyclarr config list [category]
```

## Description

Lists configuration files in a specified category.

## Arguments

### `[category]`

An optional positional argument that indicates the category of configuration files to list. If not specified,
the `local` category is used. Valid values for this argument are:

- `local`: Lists all configuration files according to the [default YAML file][1] locations.
- `templates`: Lists available template configuration files in the [Trash Guides repo][2].

[1]: /file-structure.md#default-yaml
[2]: https://trash-guides.info/Recyclarr/recyclarr-configs/

#### Command Line Examples

```bash
# List only local config files
recyclarr config list
recyclarr config list local

# List configuration files in the Trash Guides
recyclarr config list templates
```
