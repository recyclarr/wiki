---
id: docker
title: Docker Compose
sidebar_position: 2
---

Recyclarr has an official Docker image hosted on the following platforms:

| Registry                                 | Image Name                    |
| ---------------------------------------- | ----------------------------- |
| [Github Container Registry (GHCR)][ghcr] | `ghcr.io/recyclarr/recyclarr` |
| [Docker Hub][dockerhub]                  | `recyclarr/recyclarr`         |

:::info

The installation guide here will refer exclusively to the image on Github, but all the steps are
equally valid for the image on Docker Hub as well. Simply adjust the image name to pull it from
where you prefer.

:::

[ghcr]: https://github.com/recyclarr/recyclarr/pkgs/container/recyclarr
[dockerhub]: https://hub.docker.com/r/recyclarr/recyclarr

## Docker Compose Example

Before we get into the details of how to use the Docker image, I want to start with an example. I
personally hardly ever run `docker` commands directly. Instead, I use `docker compose` mainly
because the `docker-compose.yml` file is a fantastic way to keep configuration details in one place.
Thus, for the remainder of this page, all instruction and advice will be based on the example YAML
below. I highly recommend you set up your own `docker-compose.yml` this way.

:::warning

The below example should not be used verbatim. It's meant for example purposes only. Copy & paste it
but make the appropriate and necessary changes to it for your specific use case.

:::

```yml
networks:
  recyclarr:
    name: recyclarr
    external: true

services:
  recyclarr:
    image: ghcr.io/recyclarr/recyclarr
    container_name: recyclarr
    user: 1000:1000
    networks: [recyclarr]
    volumes:
      - ./config:/config
    environment:
      - TZ=America/Santiago
```

Here is a breakdown of the above YAML:

- `networks`<br/>
  You are going to ultimately want Recyclarr to be able to connect to your Sonarr and Radarr
  instances. How you have Radarr and Sonarr hosted on your system will greatly impact how this part
  gets set up. In my case, I have a dedicated docker bridge network (in this example, named
  `recyclarr`) for those services. Naturally, that means I want Recyclarr to also run on that bridge
  network so it can access those services without going out and back in through my reverse proxy.
- `image`<br/>
  The official Recyclarr image, hosted on Github.
- `container_name`<br/>
  Optional, but I don't want the funky `prefix_recyclarr` name that Docker Compose uses for services
  by default.
- `user`<br/>
  Optional User and Group ID you want to run the container as. Recyclarr will run using this UID:GID
  and any files it creates in your `/config` volume will also be owned by this user and group. The
  default for this, if not specified, is `1000:1000`.

## Tags

A series of docker tags are provided which represent various components of the semantic version
number following the format of `X.Y.Z`, where:

- `X`: Represents a *major* release containing breaking changes.
- `Y`: Represents a *feature* release.
- `Z`: Represents a *bugfix* release.

The structure of the tags are described by the following table. Assume for example purposes we're
talking about `v2.1.2`. The table is sorted by *risk* in descending order. In other words, if you
value *stability* the most,  you want the bottom row. If you value being on the latest version
(highest risk), you want the top row.

| Tag      | Description                                                             |
| -------- | ----------------------------------------------------------------------- |
| `latest` | Latest stable release, no matter what, including breaking changes       |
| `2`      | Latest *feature* and *bugfix* release; manual update for major releases |
| `2.1`    | Latest *bugfix* release; manual update if you want new features         |
| `2.1.2`  | Exact release; no automatic updates                                     |

:::info

All docker tags described here are *mutable* with the exception of the three-component version
number (e.g. `2.1.2` in the table above). A *mutable tag* is one that may change with each release
of Recyclarr.

:::

### Edge (Dev) Builds {#edge-warning}

:::danger

The `edge` and prerelease tags should be considered **extremely unstable**. These tags contain
unreleased code on the `master` branch and most likely have bugs.

These tags should **not** be a general recommendation to folks just to get the latest features. They
are intended for people that wish to help test new features prior to the next release. These builds
should not be run against your production instances of Radarr or Sonarr.

*Use these tags at your own risk!*

:::

Users that wish to be on the bleeding edge have several options available to them.

#### The `edge` Tag

A *mutable* docker tag named `edge` is available and semantically similar to `latest`, except it
contains the absolute latest code changes on the `master` branch. This is considered the most
volatile and risky tag. You should only use this tag if you full understand the consequences.

#### Prerelease Tags

If you prefer *immutable* docker tags (i.e. you want to explicitly upgrade) but still want
unreleased changes, then the prerelease tags are for you. These are in the format of `X.Y.Z-dev.N`,
where:

- `X.Y.Z` is the *next* (unreleased) semantic version of Recyclarr. This value changes depending on
  commits made to the `master` branch.
- `-dev.` is a fixed prerelease string indicating that this is a *dev build*.
- `N` is a build number, used mainly to identify unique dev builds when they share an identical
  semantic version number.

Using the table at the start of the Tags section, an example might be `2.1.3-dev.50` where `2.1.3`
is the *current* next version after `2.1.2`.

:::warning

Prerelease tags do not live indefinitely. An unspecified *retention period* is applied to them,
meaning that these tags are **permanently deleted from upstream docker registries** after that
period of time.

**These tags are not intended for long-term use.** The exact retention details are not documented
here since they may change at any time.

:::

## Configuration

### Volumes

- `/config`<br/>
  This is the application data directory for Recyclarr. In this directory, files like
  `recyclarr.yml` and `settings.yml` exist, as well as `logs`, `cache`, and other directories.

### Environment {#docker-env}

:::info

The `PUID` and `PGID` environment variables are **not** utilized by the official Docker image for
Recyclarr. Many people think these two environment variables are built into Docker, but they are
not.

Recyclarr's docker container is **rootless**. You must use the `user` property (in your docker
compose) or the `--user` option (with the docker cli) to specify the user and group IDs that
Recyclarr runs as.

:::

- `CRON_SCHEDULE` (Default: `@daily`)<br/>
  Standard cron syntax for how often you want Recyclarr to run (see [Cron Mode](#cron-mode)).

- `TZ` (Default: `UTC`)<br/>
  The time zone you want to use for Recyclarr's local time in the container.

- `RECYCLARR_CREATE_CONFIG` (Default: `false`)<br/>
  Set to `true` if you want `/config/recyclarr.yml` to be created for you automatically when the
  container starts. If the file already exists, it will not create the file again.

## Modes

The docker container can operate in one of two different ways, which are documented below.

:::info

`recyclarr.yml` does not exist the first time you run the container. You will get an error until you
either copy it manually into the volume or run `recyclarr config create` manually.

:::

### Manual Mode {#manual-mode}

There are two ways to invoke Recyclarr in manual mode. Both work equally well, but you may consider
one or the other depending on the following:

- Prefer `docker exec` if:
  - The Recyclarr container is already running
  - You're using Unraid OS
- Prefer `docker run` if:
  - The container is *not* running

See the respective sections below for whichever mode you wish to use.

<details>
<summary>Using Docker Run</summary>

When using `docker run` to invoke Recyclarr in manual mode, the container starts up, runs a
user-specified operation, and then exits. This is semantically identical to running Recyclarr
directly on your host machine, but without all of the set up requirements.

The general syntax is:

```txt
docker compose run --rm recyclarr [command] [options]
```

Where:

- `[command]` is one of the supported Recyclarr commands, such as `sync` and `list`.
- `[options]` are any options/arguments supported by that command (e.g. `--debug`, `--preview`).

Examples:

```bash
# Create a default `recyclarr.yml` in your `/config` volume
docker compose run --rm recyclarr config create

# Sync Sonarr with debug logs
docker compose run --rm recyclarr sync sonarr --debug

# Do a preview (dry run) sync for Radarr
docker compose run --rm recyclarr sync radarr --preview --debug
```

:::tip

The `--rm` option ensures the container is deleted after it runs (without it, your list of stopped
containers will start to grow the more often you run it manually).

:::

</details>

<details>
<summary>Using Docker Exec</summary>

Using `docker exec` for manual mode is similar to the previous section, except that it uses an
already-running instance of the container to perform actions.

Using Docker Compose, the general syntax is:

```txt
docker compose exec recyclarr recyclarr [command] [options]
```

Or if you prefer to use Docker directly:

```txt
docker exec recyclarr recyclarr [command] [options]
```

Where:

- `[command]` is one of the supported Recyclarr commands, such as `sync` and `list`.
- `[options]` are any options/arguments supported by that command (e.g. `--debug`, `--preview`).

Examples:

```bash
# Create a default `recyclarr.yml` in your `/config` volume (without compose)
docker exec recyclarr recyclarr config create

# Sync Sonarr with debug logs (with compose)
docker compose exec recyclarr recyclarr sync sonarr --debug

# Do a preview (dry run) sync for Radarr (without compose)
docker exec recyclarr recyclarr sync radarr --preview --debug
```

</details>

### Cron Mode {#cron-mode}

In this mode, no immediate action is performed. Rather, the container remains alive and continuously
runs sync at whatever `CRON_SCHEDULE` you set (default is daily).

To enter Cron Mode, you simply start the container in background mode:

```bash
docker compose up -d
```

This runs it without any command or options, which will result in this mode being used.

## Troubleshooting

See the [Troubleshooting](/troubleshooting/errors-warnings.md#docker) page.

## Advanced Configuration

### Read-Only Container

For additional security, you may [make your Recyclarr container's filesystem read only][read_only].
To do this in Docker Compose, you need to make two changes.

1. Add the `read_only: true` setting to your service configuration.
1. Mount `/tmp` (inside the container) to a volume. This must be done because this path must be
   writable for Recyclarr to run. I recommend you use `tmpfs` for this since the files located at
   this path are temporary by design and keeping everything in memory offers some performance
   benefits.

Using the example `docker-compose.yml` presented at the start of this page, make the following
modification:

```yml
services:
  recyclarr:
    image: ghcr.io/recyclarr/recyclarr
    read_only: true # <-- Add this to enable read-only mode
    tmpfs: /tmp # <-- Mount /tmp to a volume
    # ...
```

### Prevent in-container privilege escalation

For additional security, you may [run Recyclarr with
`--security-opt=no-new-privileges`][security_opt] in order to prevent privilege escalation. This
will prevent the container from potentially gaining new privileges via `setuid` and `setgid`
binaries, like `su` and `sudo`.

To do this in Docker Compose, you need to add the `security_opt: ['no-new-privileges:true']` setting
to your service configuration. Using the example `docker-compose.yml` presented at the start of this
page, make the following modification:

```yml
services:
  recyclarr:
    image: ghcr.io/recyclarr/recyclarr
    security_opt: ['no-new-privileges:true'] # Add this line
    # ...
```

[read_only]: https://docs.docker.com/reference/cli/docker/container/run/#read-only
[security_opt]: https://docs.docker.com/reference/cli/docker/container/run/#security-opt
