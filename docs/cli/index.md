---
id: cli
title: Command Line Reference
---

Command line interface (CLI) documentation for the `recyclarr` executable.

## Terminology

- **Command**: A sub-category of functionality that defines its own options and arguments, such as
  `sync` and `list`.
- **Option**: Looks like `-f` (short form) or `--foo` (long form) and is never required.
- **Argument**: A positional value that is either required or optional (e.g. In `recyclarr sync
sonarr`, `sonarr` is an argument of the `sync` command)

:::info

If you see a section title with a pipe character (`|`) in it, like `-d|--debug`, that means that
option has both a short *and* long form. So you can specify `-d` or `--debug`.

Headings for argument-based parameters can be enclosed in either square-brackets (e.g. `[optional]`)
or angle-brackets (e.g. `<required>`).

:::

## Commands

Also visit the [Common Options](common.md) page to learn about options usable across *all* commands.

- [recyclarr](./main.md)
- [recyclarr sync](./sync.md)
- [recyclarr list](./list)
- [recyclarr migrate](./migrate.md)
- [recyclarr config](./config)

## Deprecated Commands

:::caution

The following commands are deprecated and no longer supported. Refer to the table below for the new
CLI command you should use instead.

:::

| Deprecated Command        | Replacement (New) Command                              |
| ------------------------- | ------------------------------------------------------ |
| `recyclarr radarr`        | [`recyclarr sync radarr`](./sync.md)                   |
| `recyclarr sonarr`        | [`recyclarr sync sonarr`](./sync.md)                   |
| `recyclarr create-config` | [`recyclarr config create`](./config/config-create.md) |
