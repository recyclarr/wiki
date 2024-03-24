---
id: quality-profiles
title: Quality Profiles
sidebar_position: 4
---

| Service     |                        Supported                         |
| ----------- | :------------------------------------------------------: |
| Sonarr (v4) | <icon icon="mdi:check-bold" height="24" color="green" /> |
| Radarr      | <icon icon="mdi:check-bold" height="24" color="green" /> |

```yml
# See "Basic Setup" for `service_type` and `instance_name`
service_type:
  instance_name:
    # Quality Profile Configuration
    quality_profiles:
      - name: SD
        reset_unmatched_scores:
          enabled: true
          except:
            - My First CF
            - My Second CF
        upgrade:
          allowed: true
          until_quality: Remux-1080p
          until_score: 456
        min_format_score: 123
        score_set: sqp-1-1080p
        quality_sort: bottom
        qualities:
          - name: Remux-1080p
          - name: Bluray-1080p
            enabled: false
          - name: Bluray-720p
          - name: WEB 720p
            qualities:
              - WEBRip-720p
              - WEBDL-720p
          - name: DVD
```

**Optional.** *Default: No quality profiles are created or modified*

An array of quality profiles that along with any configuration properties that Recyclarr should use
to modify that quality profile. If a quality profile does not exist (by name), Recyclarr will create
it for you. If any properties (`qualities`, `min_format_score`, etc) are explicitly provided,
Recyclarr will ensure those values are changed and synced.

If there are values you wish Recyclarr to not touch (so that you may manually edit them yourself,
for example), simply omit those properties from your YAML. In general, properties you do not specify
indicates that you do not want Recyclarr to modify those values. Exceptions to this rule will be
mentioned in the relevant sections below as needed.

## `name` {#name}

**Required.**

The name of the quality profile to which settings should apply. The name can identify either an
existing profile or serve as the name for a new profile that gets created.

:::tip

At the moment, it is not possible to *rename* a quality profile. If you change the name here, you
are telling Recyclarr to modify an entirely different profile (if a profile exists with the new
name) *or* create a brand new quality profile using the new name.

:::

## `reset_unmatched_scores` {#reset-unmatched-scores}

**Optional.** *Default: do not reset any scores*

### `enabled` {#rus-enabled}

**Required.**

If set to `true`, custom format scores in this profile are set to `0` if they match any of the
following conditions:

- The custom format is not managed by Recyclarr (not in a `trash_ids` list).
- The custom format has no score assigned (either manually or sourced from the guide).

Custom formats may be excluded from resets with the `except` property.

If `false`, scores are never altered unless it is listed in the `trash_ids` array *and* has a valid
score to assign (either from the guide or via an explicit `score`).

### `except` {#rus-except}

**Optional.** *Default: empty; no CFs excluded from reset*

A list of one or more custom format names to exclude from score resets. The typical use case for
this is to explicitly exclude custom formats scores you manage manually (i.e. that are not synced by
Recyclarr). If this property is omitted, then all CFs are unconditionally reset to `0` as described
by the `enabled` property documentation.

## `score_set` {#score-set}

**Optional.** *Default: `default`*

A string (name) that determines the guide-provided, preset scores to use across all custom formats
assigned to a quality profile. In the TRaSH Guides, a "score set" is a set of scores across multiple
custom formats designed for specific types of profiles, such as 1080p vs 2160p.

For example, if you have `score_set: anime-radarr`, then any custom format assigned to the profile
will use the score assigned to the name `"anime-radarr"`. If any custom format does *not* have a
score that is a part of that set, it instead pulls the score from the default score set (named
`"default"`). If `score_set` is omitted, then all scores are taken from the default score set as
well.

:::tip

Use the `list custom-formats --score-sets` command to get a list of available score sets that can be
used with this property. Visit the [relevant CLI reference page][cliscoresets] for more information.

[cliscoresets]: /cli/list/list-custom-formats.md#score-sets

:::

## `min_format_score` {#min-format-score}

**Optional.** *Default: leave existing value untouched*

Correlates directly to the "Minimum Custom Format Score" field in the Quality Profile edit dialog in
Radarr/Sonarr.

## `upgrade` {#upgrade}

**Optional.**

Does nothing by itself. A container for the `allowed`, `until_quality` and `until_score` properties.

## `allowed` {#until-quality}

**Required.**

Directly correlates to the "Upgrades Allowed" check box in the Quality Profile edit dialog in
Radarr/Sonarr. If `true` is provided, the box is checked and `false` unchecks the box. If you don't
want Recyclarr to manage this checkbox, you need to delete the entire `upgrade` block (including its
contents).

## `until_quality` {#until-quality}

**Conditionally Required.** *Default: leave existing value untouched*

Correlates directly to the "Upgrade Until Quality" drop-down / select box in the Quality Profile
edit dialog in Radarr/Sonarr. The quality name mentioned here *must* exist in the `qualities` list
(if that list is provided) *or* be a valid quality in your profile that you've enabled/allowed by
manually editing the profile through the Radarr/Sonarr UI.

This property is *required* if you also specify a `qualities` list. If you do not have a `qualities`
list, this property is optional and will leave your manually set cutoff alone.

## `until_score` {#until-score}

**Optional.** *Default: leave existing value untouched*

Correlates directly to the "Upgrade Until Custom Format Score" field in the Quality Profile edit
dialog in Radarr/Sonarr.

## `qualities` {#qualities}

**Conditionally Required.** *Default: leave existing qualities untouched*

:::info

This property is **required** if the profile is being created for the first time. If the profile
*already exists*, then this property is **optional**.

:::

A list of qualities and/or quality groups to enable for this quality profile. You also have the
option of defining new quality groups using this list.

There are several important things to know about defining qualities:

- Quality *groups* are defined by having a nested `qualities` list.
- Qualities have fixed names and are defined by the service. The names must match what you see in
  the qualities list shown when editing a quality profile in the Radarr or Sonarr UI.
- The order in which you list your qualities & groups here will be reflected in the service.
- When defining a quality group, qualities you assign to that group get removed from other groups if
  needed.
- Existing groups that have qualities removed from them will be retained, unless that group becomes
  empty as a result, in which case the group is *deleted*.

The `qualities` section is a list. Each list item is allowed to have the properties documented in
the following sub-sections.

### `name` {#qualities-name}

**Required.**

The name of *an existing* quality. If this is a quality group, this name identifies either an
existing quality group *or* will be used as the name for a newly created group.

### `enabled` {#qualities-enabled}

**Optional.** *Default: `true`*

If this is omitted or set to `true`, this quality will be allowed. This is the equivalent of
checking the box next to the quality in the Radarr or Sonarr UI. If set to `false`, this quality
will be disallowed (unchecks the box).

:::warning

There are two distinct methods of disabling (disallowing) a quality: Either set this property to
`false` or delete the quality from the list entirely. **Make sure you understand the behavioral
impact of both choices!** The *safest* way to disable a quality is to set `enabled: false`, leave it
in your YAML, and in the exact order it already is. If you remove a quality to disable it, make sure
you understand [the consequences][qp_behavior].

:::

### `qualities` {#qualities-qualities}

**Optional.** *Default: Treat this as a quality*

A list of one or more strings that identify *existing qualities* to bundle into a group. By
specifying this list, you are implicitly enabling this quality item to be a *group* and not a
quality by itself. The `name` property becomes the name of this group. If the group does not exist,
it will be created.

## `quality_sort` {#quality-sort}

**Optional.** *Default: `top`*

Determines the sorting order of qualities. The sorting order is important as it [affects search
results and cutoff processing][qp_behavior] in Radarr & Sonarr v4. This property must be set to one
of the values below.

:::info

Regardless of the sorting mode, the order of the qualities *you explicitly specify* will always be
in the order in which they appear in the `qualities` section.

:::

- `top`: Qualities and quality groups you explicitly specify will be pushed to the top of the
  qualities list. Unspecified (missing) qualities will appear below that list.
- `bottom`: Qualities and quality groups you explicitly specify will be pushed to the bottom of the
  qualities list. Unspecified (missing) qualities will appear above that list.

:::tip

Want to know why you would choose one or the other? See the [Quality Profiles][qp_behavior] behavior
page.

:::

[qp_behavior]: /behavior/quality-profiles.md#order-matters
