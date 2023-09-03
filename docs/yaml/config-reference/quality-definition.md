---
id: quality-definition
title: Quality Definitions
sidebar_position: 3
---

| Service     |                        Supported                         |
| ----------- | :------------------------------------------------------: |
| Sonarr (v3) | <icon icon="mdi:check-bold" height="24" color="green" /> |
| Sonarr (v4) | <icon icon="mdi:check-bold" height="24" color="green" /> |
| Radarr      | <icon icon="mdi:check-bold" height="24" color="green" /> |

```yml
# See "Basic Setup" for `service_type` and `instance_name`
service_type:
  instance_name:
    # Quality Definition Configuration
    quality_definition:
      type: series
      preferred_ratio: 0.5
```

**Optional.** *Default: No quality definitions are modified*

Specify information related to quality definition processing here. Only the following child
properties are permitted. If not specified, no quality definitions will be synced.

### `type` {#qd-type}

**Required.**

A quality definition type found by using the [`list qualities` command][listqualities]. The type
specified here identifies the quality size settings that should be parsed and uploaded to your
Sonarr or Radarr instance.

### `preferred_ratio` {#qd-preferred-ratio}

**Optional.** *Default: use guide values*

A value `0.0` to `1.0` that represents the percentage (interpolated) position of that middle slider
you see when you enable advanced settings on the Quality Definitions page in Radarr or Sonarr. A
value of `0.0` means the preferred quality will match the minimum quality. Likewise, `1.0` will
match the maximum quality. A value such as `0.5` will keep it halfway between the two.

:::info Behavioral Notes

- Any value less than `0` or greater than `1` will result in a warning log printed and the value
  will be clamped.
- Using this property on a Sonarr v3 instance does nothing, since older versions of Sonarr only have
  min/max values and no preferred.

:::

[listqualities]: /cli/list/list-qualities.md
