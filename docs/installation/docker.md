---
id: docker
title: Docker
sidebar_position: 1
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

:::caution

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

Tags for the docker image are broken down into the various components of the semantic version number
following the format of `X.Y.Z`, where:

- `X`: Represents a *major* release containing breaking changes.
- `Y`: Represents a *feature* release.
- `Z`: Represents a *bugfix* release.

The structure of the tags are described by the following table. Assume for example purposes we're
talking about `v2.1.2`. The table is sorted by *risk* in descending order. In other words, if you
value *stability* the most,  you want the bottom row. If you value being on *the bleeding edge*
(highest risk), you want the top row.

:::danger

## Warning About Edge Builds {#edge-warning}

The `edge` tag should be considered **extremely unstable**. This tag contains the absolute latest
changes on the `master` branch and most likely has bugs.

The `edge` tag should **not** be a general recommendation to folks just to get the latest features.
It is intended for people that wish to help test new features prior to the next release. These
builds should not be run against your production / meaningful instances of Radarr or Sonarr.

*Use this tag at your own risk!*

:::

| Tag      | Description                                                             |
| -------- | ----------------------------------------------------------------------- |
| `edge`   | Docker and Recyclarr changes on `master`. **Potentially unstable!**     |
| `latest` | Latest stable release, no matter what, including breaking changes       |
| `2`      | Latest *feature* and *bugfix* release; manual update for major releases |
| `2.1`    | Latest *bugfix* release; manual update if you want new features         |
| `2.1.2`  | Exact release; no automatic updates                                     |

## Configuration

### Volumes

- `/config`<br/>
  This is the application data directory for Recyclarr. In this directory, files like
  `recyclarr.yml` and `settings.yml` exist, as well as `logs`, `cache`, and other directories.

### Environment {#docker-env}

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
either copy it manually into the volume or run `recyclarr create-config` manually.

:::

### Manual Mode {#manual-mode}

In manual mode, the container starts up, runs a user-specified operation, and then exits. This is
semantically identical to running Recyclarr directly on your host machine, but without all of the
set up requirements.

The general syntax is:

```txt
docker compose run --rm recyclarr [subcommand] [options]
```

Where:

- `[subcommand]` is one of the supported Recyclarr subcommands, such as `sonarr` and `radarr`.
- `[options]` are any options supported by that subcommand (e.g. `--debug`, `--preview`).

Examples:

```bash
# Create a default `recyclarr.yml` in your `/config` volume
docker compose run --rm recyclarr create-config

# Sync Sonarr with debug logs
docker compose run --rm recyclarr sonarr --debug

# Do a preview (dry run) sync for Radarr
docker compose run --rm recyclarr radarr --preview --debug
```

:::tip

The `--rm` option ensures the container is deleted after it runs (without it, your list of stopped
containers will start to grow the more often you run it manually).

:::

:::danger

#### Warning about `docker exec` {#docker-exec}

I will not support any usage of `docker exec`, for now. It's far too error prone and can result in
mixed file permissions in Recyclarr's app data directory (the `/config` volume). Please use `docker
run --rm` instead (documented in the previous section).

When you run `docker exec` without the `--user` option, commands are executed as the default
internal user, which is `1000:1000`. If you absolutely insist on using this command, ensure you
specify the `--user` option using the same UID:GID that you use in `docker run` and that matches
your volume's file ownership.

:::

### Cron Mode {#cron-mode}

In this mode, no immediate action is performed. Rather, the container remains alive and continuously
runs both Sonarr and Radarr sync at whatever `CRON_SCHEDULE` you set (default is daily).

If either the Sonarr or Radarr sync operations fail, they will not prevent each other from
proceeding. In other words, if the order the sync happens is first Sonarr and then Radarr, if Sonarr
fails, the Radarr sync will still proceed after. From a linux shell perspective, it effectively runs
this command:

```bash
recyclarr sonarr; recyclarr radarr
```

To enter Cron Mode, you simply start the container in background mode:

```bash
docker compose up -d
```

This runs it without any subcommand or options, which will result in this mode being used.

## Troubleshooting

See the [Troubleshooting](/troubleshooting.md#docker) page.
