---
id: errors
title: Errors & Warnings
---

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

<details><summary>
No configuration YAML files found
</summary>

Recyclarr could not find any YAML configuration files to load *or* files specified were missing.
There are three ways to provide configuration data:

1. Via the `recyclarr.yml` file.
1. One or more YAML files in the `configs` directory.
1. Paths to YAML files provided via the `--config` command line argument.

When using the CLI, the files provided *must* exist. To solve this error, use one of the above
methods to provide your YAML configuration. See the documentation about [default YAML
configuration][default-yaml] for more information. There is also [an
example](/yaml/configuration-examples.md#yaml-structure) showing multiple configuration files
and their structure.

[default-yaml]: file-structure.md#default-yaml

</details>

<details><summary>
Found array-style list of instances instead of named-style. Array-style lists of Sonarr/Radarr
instances are deprecated
</summary>

:::note Version Requirement

This functionality requires `v3.0.0` or greater!

:::

Array style lists look like this:

```yml
radarr:
  - base_url: http://localhost:7878
    api_key: 123abc
```

This style is deprecated. Going forward, all instances must be named mappings. Convert the above to
something like this:

```yml
radarr:
  my_radarr_instance:
    base_url: http://localhost:7878
    api_key: 123abc
```

Where `my_radarr_instance` can be any name you want as long as it is valid YAML.

</details>

<details><summary>
Incompatible value assigned/used at line 7: Invalid cast from 'System.String' to
'Recyclarr.TrashLib.Config.Services.QualityDefinitionConfig'
</summary>

As of version 4.0.0, the syntax for `quality_definitions` changed. You must manually change to the
new format. See [the v4 release notes](/upgrade-guide/v4.0.md).

</details>

## Docker-Specific Errors & Solutions {#docker}

A series of troubleshooting steps for docker-specific issues.

### Permission Issues

The `/config` volume is very sensitive to user changes in the container. For example, if you first
run the container using `user: 1000:1000` and then run a second time using `user: 1500:1500`, you
are likely to get errors. This is because files that Recyclarr creates are owned by the user & group
you specify. Not all files can be used by multiple users.

If you change your user and/or group IDs, it is your responsibility to update the ownership of files
in the `/config` volume so that they match the UID and GID you are specifying. This can be done
through the `chown` command and may require root permissions on your host system.

### Error Messages

Below is a list of error messages you may encounter along with possible solutions.

:::info

None Yet...

:::

## Non-Docker Errors & Solutions {#non-docker-errors}

The troubleshooting steps documented here are for the non-docker version of Recyclarr (running it
directly on a host machine). The [Docker](installation/docker.md) page has troubleshooting steps as
well.

<details><summary>
Failed to create CoreCLR, HRESULT: 0x8007000E
</summary>

This means "Out of Memory". Ensure you have enough memory on your system. If you do, try setting the
`DOTNET_GCHeapHardLimit` environment variable to `10000000` and try again.

</details>

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

[#42]: https://github.com/recyclarr/recyclarr/issues/42
