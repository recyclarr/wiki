---
id: getting-started
sidebar_position: 4
title: Getting Started
---

Recyclarr requires a YAML configuration file in order to work. By default, this file is named
`recyclarr.yml` and lives in your [application data directory][appdata]. Run the steps below if you
want to get started with a minimal configuration file.

1. Run `recyclarr create-config` to create a starter `recyclarr.yml` file in the [application data
   directory][appdata].
1. Open the generated YAML file from the previous step. At a minimum you must update the `base_url`
   and `api_key` properties for each service that you want to use. Use the configuration [reference]
   and [examples] pages to assist you in understanding an editing other parts of the file as you see
   fit.
1. Run `recyclarr sonarr` and/or `recyclarr radarr` as needed to update those instances using the
   configuration provided in the previous step.

Lastly, each subcommand supports printing help on the command line. Simply run `recyclarr --help`
for the main help output and a list of subcommands. You can then see the help for each subcommand by
running `recyclarr [subcommand] --help`, where `[subcommand]` is one of those subcommands (e.g.
`sonarr`). You can also visit the [CLI Reference](/reference/cli-reference.md) page for detailed
documentation as well.

[appdata]: /file-structure.md#appdata-directory
[reference]: /reference/config-yml-reference.md
[examples]: /reference/configuration-examples.md
