---
title: Common Options
sidebar_position: 1
---

These are options shared by *all* commands.

### `-h|--help`

Print help output. Help is also context-aware, so you can get help output specific to any command.
For example, `recyclarr sync -h` will print help specific to the `sync` command.

### `-d|--debug` {#debug-arg}

By default, Info, Warning and Error log levels are displayed in the console. This option enables
Debug level logs to be displayed. This is designed for debugging and development purposes and
generally will be too noisy for normal program usage.

### `--app-data` {#app-data}

Overrides the normal, default location of the [application data
directory](/file-structure.md#appdata-directory). Note that this option is mainly intended for usage
in the official Docker image. It is not intended for normal use outside of that.

If you'd like this behavior globally for all commands without having to specify this option, define
an environment variable named `RECYCLARR_APP_DATA` with the same path. Note that if you have both
set, `--app-data` always takes precedence.
