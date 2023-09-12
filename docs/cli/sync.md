---
id: sync
title: recyclarr sync
---

## Usage

```js
recyclarr sync [service] [OPTIONS]
```

## Description

Synchronizes the guide with various services.

## Arguments

### `[service]`

An optional positional argument that indicates the specific service type to sync. If not specified,
*all* service types are synced. Valid values for this argument are:

- `radarr`
- `sonarr`

#### Command Line Examples

```bash
# Sync both Radarr and Sonarr
recyclarr sync

# Sync just Radarr
recyclarr sync radarr

# Sync just Sonarr
recyclarr sync sonarr
```

## Options

### `-c|--config` {#config}

One or more paths to YAML configuration files. If this argument is not specified, default
configuration files will be used according to rules documented on the [File
Structure](../file-structure.md) page.

:::tip

If you specify more than one configuration file, you must repeat the `-c` option for each file. See
the examples below.

:::

#### Command Line Examples

```bash
# Sync using default configs (recyclarr.yml or files in the 'configs' directory)
recyclarr sync

# Use a single config
recyclarr sync --config ../myconfig.yml

# Use multiple configs
recyclarr sync -c ../myconfig1.yml -c "files/my config 2.yml"
```

### `-p|--preview` {#preview}

Performs a "dry run" by parsing the guide and printing the parsed data in a readable format to the
user. This does *not* perform any API calls to Radarr or Sonarr. You may want to run a preview if
you'd like to see if the guide is parsed correctly and preview changes that will be made before
updating your instance.

Example output for Sonarr Release Profile parsing

```txt
First Release Profile
  Include Preferred when Renaming?
    CHECKED

  Must Not Contain:
    /(\[EMBER\]|-EMBER\b|DaddySubs)/i

  Preferred:
    100        /\b(amzn|amazon)\b(?=[ ._-]web[ ._-]?(dl|rip)\b)/i
    90         /\b(dsnp|dsny|disney)\b(?=[ ._-]web[ ._-]?(dl|rip)\b)/i

Second Release Profile
  Include Preferred when Renaming?
    NOT CHECKED

  Preferred:
    180        /(-deflate|-inflate)\b/i
    150        /(-AJP69|-BTN|-CasStudio|-CtrlHD|-KiNGS)\b/i
    150        /(-monkee|-NTb|-NTG|-QOQ|-RTN)\b/i
```

Example output for Sonarr Quality Definition parsing

```txt
Quality              Min        Max
-------              ---        ---
HDTV-720p            2.3        67.5
HDTV-1080p           2.3        137.3
WEBRip-720p          4.3        137.3
WEBDL-720p           4.3        137.3
Bluray-720p          4.3        137.3
WEBRip-1080p         4.5        257.4
WEBDL-1080p          4.3        253.6
Bluray-1080p         4.3        258.1
Bluray-1080p Remux   0          400
HDTV-2160p           69.1       350
WEBRip-2160p         69.1       350
WEBDL-2160p          69.1       350
Bluray-2160p         94.6       400
Bluray-2160p Remux   204.4      400
```

### `-i|--instance` {#instance}

One or more instance names to sync. Instance names are the names you give each of your instances in
your YAML configuration files. In the example `recyclarr.yml` below, `movies` and `series` are
instance names:

```yml
radarr:
  movies:
    base_url: http://localhost:7878
    api_key: abc123
sonarr:
  series:
    base_url: http://localhost:8989
    api_key: def456
```

:::info

The `[service]` argument influences the behavior of instance-based syncing. If you specify a
specific service to sync, such as `radarr`, then the `--instance` option will only look at instances
for that specific service type (in this example, it will only look at Radarr instances).

:::

#### Command Line Examples

```bash
# Sync instances named `movies` and `series` across both Radarr and Sonarr
recyclarr sync -i movies -i series

# Sync an instance named 'series' only if they are in Sonarr
recyclarr sync sonarr --instance series
```
