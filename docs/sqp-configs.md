---
id: sqp-configs
title: Pre-Built SQP Configuration Files
sidebar_class_name: hidden
hide_table_of_contents: true
---

Recyclarr offers pre-built configuration files that can be used as a straightforward method of
deploying one of more of the TRaSH Guides profiles:

- [SQP-1 (1080p) - Streaming Optimized][radarr-sqp-1-1080p-trash]
- [SQP-1 (2160p) - Streaming Optimized][radarr-sqp-1-2160p-trash]
- [SQP-2 (2160p) - UHD Remux|Bluray|IMAX-E][radarr-sqp-2-trash]
- [SQP-3 (2160p) - UHD Remux|IMAX-E][radarr-sqp-3-trash]
- [SQP-4 (2160p) - UHD WEBDL|IMAX-E][radarr-sqp-4-trash]
- [SQP-5 (2160p) - UHD Bluray|IMAX-E][radarr-sqp-5-trash]

[radarr-sqp-1-1080p-trash]: https://trash-guides.info/SQP/1/
[radarr-sqp-1-2160p-trash]: https://trash-guides.info/SQP/1-4k/
[radarr-sqp-2-trash]: https://trash-guides.info/SQP/2/
[radarr-sqp-3-trash]: https://trash-guides.info/SQP/3/
[radarr-sqp-4-trash]: https://trash-guides.info/SQP/4/
[radarr-sqp-5-trash]: https://trash-guides.info/SQP/5/

:::caution

- The information provided on this page is for private use only and is not to be made public. :bangbang:
- Users who have been provided with the link to this page **must** keep it private. :bangbang:
- You can mention your use of a specific SQP in the TRaSH Guides Discord server public channels.
- Interested individuals can obtain access to this page, along with other SQP information, through
  the TRaSH Guides Discord server.

:::

These pre-built configuration files are composed of two primary elements:

- Includes<br/>
  [Include templates][include-templates] are utilized to synchronize all mandatory elements of any
  given guide profile. These are split into `quality_definition`, `quality_profile` and
  `custom_formats` elements. If any of these are not desired, they can be commented out.
  The content of these include templates can be found in the
  [Recyclarr config-templates GitHub repository][config-templates-repo].

  [include-templates]: https://recyclarr.dev/wiki/yaml/config-reference/include/#template
  [config-templates-repo]: https://github.com/recyclarr/config-templates

- Custom Formats<br/>
  Custom formats that are added to the pre-built configuration file directly - i.e., not by way of
  an include - allow the user to choose from one or more profile variations. These choices mirror
  those described on the TRaSH Guides profile pages. Comments are provided in the pre-built
  configuration files, although these are supplementary in nature and the relevant guide profile
  page should be consulted for full information.

## Deployment

The pre-built configuration files can be deployed in two ways:

- Via the CLI using [`recyclarr config create -t`][recyclarr-config-create-t].
- Manually, by copying the contents of the relevant pre-built configuration file into a
- [supported file location][file-structure]. The files can be found in the index below.

  [recyclarr-config-create-t]: https://recyclarr.dev/wiki/cli/config/create/#-t--template
  [file-structure]: https://recyclarr.dev/wiki/file-structure/#default-yaml

## Customization

:::caution

The pre-built configuration files are designed as a simple mechanism to deploy one or more of the
TRaSH Guides profiles, in exactly the same configuration as they appear on the guides pages.
Minimal customization is possible, however more extensive customization usually necessitates
building your own custom configuration file.

:::

:::caution

At this time, include templates can only be used with quality profiles that have the **same name**
as shown in the equivalent guide profile page. The profile name is hard-coded into the
include template.

:::

As the pre-built configuration files feature include templates, these will need to be overridden
by custom configuration added to the configuration file.
[Guidance is available on this behaviour][behaviour-include].

[behaviour-include]: https://recyclarr.dev/wiki/behavior/include/.

A common request is to add additional qualities to a [quality profile][quality-profile]. This is
as simple as writing your own complete quality profile configuration and adding it to your
configuration file. From there, the quality profile include template can either be commented out,
or if left enabled then Recyclarr will process the customized configuration as described in the
[include behaviour section][behaviour-include-quality-profiles].

Additional custom formats can be added to the configuration file in the same way as normal.

[quality-profile]: https://recyclarr.dev/wiki/yaml/config-reference/quality-profiles/
[behaviour-include-quality-profiles]: https://recyclarr.dev/wiki/behavior/include/#quality-profiles

## Index

| Radarr                                              |
| --------------------------------------------------- |
| [SQP-1 (1080p) - Streaming Optimized](#sqp-1-1080p) |
| [SQP-1 (2160p) - Streaming Optimized](#sqp-1-2160p) |
| [SQP-2 (2160p) - UHD Remux\|Bluray\|IMAX-E](#sqp-2) |
| [SQP-3 (2160p) - UHD Remux\|IMAX-E](#sqp-3)         |
| [SQP-4 (2160p) - UHD WEBDL\|IMAX-E](#sqp-4)         |
| [SQP-5 (2160p) - UHD Bluray\|IMAX-E](#sqp-5)        |

## Radarr

### SQP-1 (1080p) - Streaming Optimized {#sqp-1-1080p}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/radarr/templates/sqp/sqp-1-1080p.yml
```

</details>

### SQP-1 (2160p) - Streaming Optimized {#sqp-1-2160p}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/radarr/templates/sqp/sqp-1-2160p.yml
```

</details>

### SQP-2 (2160p) - UHD Remux|Bluray|IMAX-E {#sqp-2}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/radarr/templates/sqp/sqp-2.yml
```

</details>

### SQP-3 (2160p) - UHD Remux|IMAX-E {#sqp-3}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/radarr/templates/sqp/sqp-3.yml
```

</details>

### SQP-4 (2160p) - UHD WEBDL|IMAX-E {#sqp-4}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/radarr/templates/sqp/sqp-4.yml
```

</details>

### SQP-5 (2160p) - UHD Bluray|IMAX-E {#sqp-5}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/radarr/templates/sqp/sqp-5.yml
```

</details>
