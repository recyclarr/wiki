---
id: guide-configs
title: Pre-Built Configuration Files
sidebar_class_name: hidden # It's in the nav title bar
hide_table_of_contents: true
---

Recyclarr offers pre-built configuration files that can be used as a straightforward method of
deploying one of more of the TRaSH Guides profiles:

- [Radarr][radarr-profiles-trash]
- [Radarr (Anime)][radarr-anime-profiles-trash]
- [Radarr (French)][radarr-french-profiles-trash]
- [Sonarr v4][sonarr-v4-profiles-trash]
- [Sonarr v4 (Anime)][sonarr-v4-anime-profiles-trash]
- [Sonarr v4 (French)][sonarr-v4-french-profiles-trash]

[radarr-profiles-trash]: https://trash-guides.info/Radarr/radarr-setup-quality-profiles/
[radarr-anime-profiles-trash]: https://trash-guides.info/Radarr/radarr-setup-quality-profiles-anime/
[radarr-french-profiles-trash]: https://trash-guides.info/Radarr/radarr-setup-quality-profiles-french-en/
[sonarr-v4-profiles-trash]: https://trash-guides.info/Sonarr/sonarr-setup-quality-profiles/
[sonarr-v4-anime-profiles-trash]: https://trash-guides.info/Sonarr/sonarr-setup-quality-profiles-anime/
[sonarr-v4-french-profiles-trash]: https://trash-guides.info/Sonarr/sonarr-setup-quality-profiles-french-en/

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
  [supported file location][file-structure]. The files can be found in the index below.

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

| Radarr                                                            | Sonarr v4                                              |
| ----------------------------------------------------------------- | ------------------------------------------------------ |
| [HD Bluray + WEB](#hd-bluray-web)                                 | [WEB-1080p](#web-1080p-v4)                             |
| [UHD Bluray + WEB](#uhd-bluray-web)                               | [WEB-2160p](#web-2160p-v4)                             |
| [Remux + WEB 1080p](#remux-web-1080p)                             | [Anime (Sonarr)](#anime-sonarr-v4)                     |
| [Remux + WEB 2160p](#remux-web-2160p)                             | [French WEB-1080p MULTi](#french-web-1080p-multi-v4)   |
| [Anime (Radarr)](#anime-radarr)                                   | [French WEB-1080p VOSTFR](#french-web-1080p-vostfr-v4) |
| [French HD Bluray + WEB MULTi](#french-hd-bluray-web-multi)       | [French Anime MULTi](#french-anime-multi-v4)           |
| [French HD Bluray + WEB VOSTFR](#french-hd-bluray-web-vostfr)     | [French Anime VOSTFR](#french-anime-vostfr-v4)         |
| [French UHD Bluray + WEB MULTi](#french-uhd-bluray-web-multi)     |                                                        |
| [French UHD Bluray + WEB VOSTFR](#french-uhd-bluray-web-vostfr)   |                                                        |
| [French Remux + WEB 1080p MULTi](#french-remux-web-1080p-multi)   |                                                        |
| [French Remux + WEB 1080p VOSTFR](#french-remux-web-1080p-vostfr) |                                                        |
| [French Remux + WEB 2160p MULTi](#french-remux-web-2160p-multi)   |                                                        |
| [French Remux + WEB 2160p VOSTFR](#french-remux-web-2160p-vostfr) |                                                        |

---

## Radarr

### HD Bluray + WEB {#hd-bluray-web}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/radarr/templates/hd-bluray-web.yml
```

</details>

### UHD Bluray + WEB {#uhd-bluray-web}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/radarr/templates/uhd-bluray-web.yml
```

</details>

### Remux + WEB 1080p {#remux-web-1080p}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/radarr/templates/remux-web-1080p.yml
```

</details>

### Remux + WEB 2160p {#remux-web-2160p}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/radarr/templates/remux-web-2160p.yml
```

</details>

### Anime (Radarr) {#anime-radarr}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/radarr/templates/anime-radarr.yml
```

</details>

### French HD Bluray + WEB MULTi {#french-hd-bluray-web-multi}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/radarr/templates/french-hd-bluray-web-multi.yml
```

</details>

### French HD Bluray + WEB VOSTFR {#french-hd-bluray-web-vostfr}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/radarr/templates/french-hd-bluray-web-vostfr.yml
```

</details>

### French UHD Bluray + WEB MULTi {#french-uhd-bluray-web-multi}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/radarr/templates/french-uhd-bluray-web-multi.yml
```

</details>

### French UHD Bluray + WEB VOSTFR {#french-uhd-bluray-web-vostfr}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/radarr/templates/french-uhd-bluray-web-vostfr.yml
```

</details>

### French Remux + WEB 1080p MULTi {#french-remux-web-1080p-multi}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/radarr/templates/french-remux-web-1080p-multi.yml
```

</details>

### French Remux + WEB 1080p VOSTFR {#french-remux-web-1080p-vostfr}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/radarr/templates/french-remux-web-1080p-vostfr.yml
```

</details>

### French Remux + WEB 2160p MULTi {#french-remux-web-2160p-multi}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/radarr/templates/french-remux-web-2160p-multi.yml
```

</details>

### French Remux + WEB 2160p VOSTFR {#french-remux-web-2160p-vostfr}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/radarr/templates/french-remux-web-2160p-vostfr.yml
```

</details>

---

## Sonarr v4

### WEB-1080p {#web-1080p-v4}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/sonarr/templates/web-1080p-v4.yml
```

</details>

### WEB-2160p {#web-2160p-v4}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/sonarr/templates/web-2160p-v4.yml
```

</details>

### Anime (Sonarr) {#anime-sonarr-v4}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/sonarr/templates/anime-sonarr-v4.yml
```

</details>

### French WEB-1080p MULTi {#french-web-1080p-multi-v4}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/sonarr/templates/french-web-1080p-multi-v4.yml
```

</details>

### French WEB-1080p VOSTFR {#french-web-1080p-vostfr-v4}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/sonarr/templates/french-web-1080p-vostfr-v4.yml
```

</details>

### French WEB-2160p MULTi {#french-web-2160p-multi-v4}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/sonarr/templates/french-web-2160p-multi-v4.yml
```

</details>

### French WEB-2160p VOSTFR {#french-web-2160p-vostfr-v4}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/sonarr/templates/french-web-2160p-vostfr-v4.yml
```

</details>

### French Anime MULTi {#french-anime-multi-v4}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/sonarr/templates/french-anime-multi-v4.yml
```

</details>

### French Anime VOSTFR {#french-anime-vostfr-v4}

<details>
<summary>Click to show/hide</summary>

```yml reference title="Copy this configuration into your own configuration file:"
https://github.com/recyclarr/config-templates/blob/master/sonarr/templates/french-anime-vostfr-v4.yml
```

</details>
