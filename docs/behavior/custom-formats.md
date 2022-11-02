---
id: custom-formats
title: Custom Formats
sidebar_position: 1
---

Custom formats are supported by both Radarr and Sonarr, so this page applies to both.

## Custom Format Synchronization {#synchronization}

Custom format synchronization is broken up into three categories

- Creation: Custom formats that are in the guide but do not exist in \*arr are **created**.
- Updates: Custom formats that already exist in both the guide and in \*arr *but are different* are
  **updated**.
- Deletions: If deletions are allowed by having the `delete_old_custom_formats` configuration
  setting set to `true`, then custom formats in \*arr are deleted if they are removed from the guide
  **or** removed from your configuration file.

:::info

Recyclarr will *never* touch custom formats that you create by hand, unless they share a name with a
custom format in the guide. In general, Recyclarr must have been the one to create a custom format
in order to do anything to it (update or delete).

:::

## Cache

### Summary

The synchronization cache in Recyclarr allows it to more accurately detect changes to custom formats
in the TRaSH guides. This mainly helps cover changes done on the \*arr side, like renames.

Once Recyclarr creates or updates a custom format in \*arr, it records information about it in a
cache file located in the `cache` subdirectory under the main app data location. The [location
varies](../file-structure.md#appdata-directory) depending on platform.

The cache files are not meant to be edited by users. In general I recommend leaving them alone.
Recyclarr will manage it for you. However, sometimes a bug may cause an issue where deleting the
cache directory will be a good way to recover.
