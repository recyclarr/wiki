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

## Default YAML Configuration File

The default YAML configuration file is named `recyclarr.yml` and it is always located in the
application data directory (listed above based on platform).

For backward compatibility, if the `recyclarr.yml` file is located adjacent to your `recyclarr`
executable, that will be loaded *first* and a warning is printed to the console. In this scenario,
even if a `recyclarr.yml` file exists in your application data directory, *it will not be loaded!*

The solution is to delete or move the `recyclarr.yml` sitting next to the executable.
