---
id: troubleshooting
title: Troubleshooting
---

:::caution

Recyclarr may stop working at any time due to guide updates. I will do my best to fix them in a
timely manner. [Reporting](https://github.com/recyclarr/recyclarr/issues) such issues ASAP would be
appreciated and will help identify issues more quickly.

:::

## Obtaining Debug Logs

Recyclarr always outputs logs as files in a directory on your filesystem. Each execution of
Recyclarr yields a new file and those files always contain verbose (debug) logs. When reporting
issues, I ask that you always include logs from the file rather than the command line output since
Recyclarr will not include debug logs by default in the console output.

Below is a list of locations where you can find the log directory depending on platform.

| Platform | Location                                       |
| -------- | ---------------------------------------------- |
| Windows  | `%APPDATA%\recyclarr\logs`                     |
| Linux    | `~/.config/recyclarr/logs`                     |
| MacOS    | `~/Library/Application Support/recyclarr/logs` |
| Docker   | `/config/logs`                                 |

## Warnings

This section contains a list of warnings you might see in your console output / logs. These are
usually caused by configuration issues or something else within the user's control to fix. Below are
examples of messages you may see with some guidance on how to address them.

<details><summary>
Custom format with trash ID e23edd2482476e595fb990b12e7c609c is duplicated 1 times in quality
profile SD with the following scores: [500]
</summary>

This situation is caused by specifying a custom format more than once under the same Quality
Profile. Whether the score is different or not doesn't matter; the score is shown in the warning
message to assist you with debugging the problem.

The below YAML is an example of what will cause this warning.

```yml
custom_formats:
  - trash_ids:
      - e7718d7a3ce595f289bfee26adc178f5 # Repack/Proper
      - e23edd2482476e595fb990b12e7c609c # DV HDR10
    quality_profiles:
      - name: SD
        score: 1000
  - trash_ids:
      - e23edd2482476e595fb990b12e7c609c # DV HDR10
    quality_profiles:
      - name: SD
        score: 500
```

Above, you can see that "DV HDR10" (Trash ID `e23edd2482476e595fb990b12e7c609c`) is specified
*twice* for the same quality profile named `SD`. The solution to this warning is to remove one of
the two custom formats. In this case, to demonstrate the solution, I'll remove the copy that is
assigned a score of `1000`:

```yml
custom_formats:
  - trash_ids:
      - e7718d7a3ce595f289bfee26adc178f5 # Repack/Proper
    quality_profiles:
      - name: SD
        score: 1000
  - trash_ids:
      - e23edd2482476e595fb990b12e7c609c # DV HDR10
    quality_profiles:
      - name: SD
        score: 500
```

</details>

## Non-docker Errors & Solutions

The troubleshooting steps documented here are for the non-docker version of Recyclarr (running it
directly on a host machine). The [Docker](installation/docker.md) page has troubleshooting steps as
well.

- On Mac or Linux OS, you may see the following error when you run `recyclarr`:

  ```txt
  Failed to map file. open(/Users/foo/Downloads/recyclarr) failed with error 13
  Failure processing application bundle.
  Couldn't memory map the bundle file for reading.
  A fatal error occurred while processing application bundle
  ```

  This cryptic message is actually a permissions error, likely because your executable does not have
  read permissions set. Simply run `chmod u+rx recyclarr` to add read + execute permissions on the
  `recyclarr` executable.

- When communicating with Radarr or Sonarr, you get the following exception message:

  > FlurlParsingException: Response could not be deserialized to JSON: `GET
  > http://hostname:6767/api/v3/customformat?apikey=SNIP` --->
  > Newtonsoft.Json.JsonSerializationException: Deserialized JSON type
  > 'Newtonsoft.Json.Linq.JArray' is not compatible with expected type
  > 'Newtonsoft.Json.Linq.JObject'. Path '', line 1, position 2.

  This means your Base URL is missing from the URL you specified in the YAML. See issue [#42] for
  more details.

- On Ubuntu 22.04 or derivatives when you run `recyclarr radarr` you will get the following error:

  ```txt
  [ERR] An exception occurred during git operations on path: /home/REDACTED/.config/recyclarr/repo
  LibGit2Sharp.LibGit2SharpException: could not load ssl libraries
  ------
  [INF] Deleting local git repo and retrying git operation...
  [1] 257872 segmentation fault (core dumped) ./recyclarr radarr
  ```

  Ubuntu and Fedora moved from libssl 1.1 to libssl 3.0 in version 22.04 and 36 respectively. This
  currently breaks Recyclarr. See issue [#54] for more details.

  As a workaround, you can install libssl-1.1 from an earlier version, however, this might impact
  other applications. Instructions are below for various platforms. Choose the one that best fits
  your scenario.

  - On Ubuntu 22.04 x64 (64-bit) run the following commands in the shell

    ```sh
    wget http://mirrors.kernel.org/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1l-1ubuntu1.2_amd64.deb
    sudo dpkg -i libssl1.1_1.1.1l-1ubuntu1.2_amd64.deb
    ```

  - On Ubuntu 22.04 x86 (32-bit) run the following commands in the shell

    ```sh
    wget http://mirrors.kernel.org/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1l-1ubuntu1.2_i386.deb
    sudo dpkg -i libssl1.1_1.1.1l-1ubuntu1.2_i386.deb
    ```

  - On Fedora 36 you can simply install the compatibility package included in the default repo

    ```sh
    sudo dnf install openssl1.1
    ```

[#42]: https://github.com/recyclarr/recyclarr/issues/42
[#54]: https://github.com/recyclarr/recyclarr/issues/54
