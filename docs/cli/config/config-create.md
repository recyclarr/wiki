---
id: create
title: recyclarr config create
---

## Usage

```js
recyclarr config create [OPTIONS]
```

## Description

Create a starter configuration YAML file. The location of this file is the [application data
directory](/file-structure.md#appdata-directory).

## Options

Visit [Common Options](../common.md) to read about options usable by all commands.

### `--path`

The absolute or relative path to the YAML file you want to create. The contents will be the same,
the only difference is what file the data gets written to.

#### Command Line Examples

```bash
# Create a starter config using the default file, `recyclarr.yml`
recyclarr config create

# Create a starter config in a specific location
recyclarr config create --path ~/myconfig.yml
```
