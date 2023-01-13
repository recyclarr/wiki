---
id: custom-formats
title: recyclarr list custom-formats
---

## Usage

```js
recyclarr list custom-formats <service> [OPTIONS]
```

## Description

For a specific service, this command prints a list of all available Custom Formats from the TRaSH
Guides in YAML format, ready to be copied & pasted directly into your configuration YAML file (e.g.
`recyclarr.yml`). Here is an example of the output you will see:

```txt
List of Custom Formats in the TRaSH Guides:

          - b124be9b146540f8e62f98fe32e49a2a # 1.0 Mono
          - 820b09bb9acbfde9c35c71e0e565dad8 # 1080p
          - 89dac1be53d5268a7e10a19d3c896826 # 2.0 Stereo
          - fb392fb0d61a010ae38e49ceaa24a1ef # 2160p
          - 205125755c411c3b8622ca3175d27b37 # 3.0 Sound

The above Custom Formats are in YAML format and ready to be copied & pasted under the `trash_ids:` property.
```

You can copy & paste these directly into your config YAML, like this:

```yml
radarr:
  main:
    base_url: http://127.0.0.1:7878
    api_key: 2424b3643507485ea2e06382d3f0b8a3
    custom_formats:
      - trash_ids:
          - b124be9b146540f8e62f98fe32e49a2a # 1.0 Mono
          - 820b09bb9acbfde9c35c71e0e565dad8 # 1080p
```

## Arguments

### `<service>`

A required positional argument that indicates the specific service type to list custom formats for.
Valid values for this argument are:

- `radarr`: List [Radarr custom formats][radarrcfs]
- `sonarr`: List [Sonarr custom formats][sonarrcfs]

[radarrcfs]: https://trash-guides.info/Radarr/Radarr-collection-of-custom-formats/
[sonarrcfs]: https://trash-guides.info/Sonarr/sonarr-collection-of-custom-formats/

## Options

Visit [Common Options](../common.md) to read about options usable by all commands.
