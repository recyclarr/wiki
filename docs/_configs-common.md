These pre-built configuration files are composed of two primary elements:

- **Includes**<br/>
  [Include templates][include-templates] are utilized to synchronize all mandatory elements of any
  given guide profile. These are split into `quality_definition`, `quality_profile` and
  `custom_formats` elements. If any of these are not desired, they can be commented out. The content
  of these include templates can be found in the [Recyclarr config-templates GitHub
  repository][config-templates-repo].

  [include-templates]: https://recyclarr.dev/wiki/yaml/config-reference/include/#template
  [config-templates-repo]: https://github.com/recyclarr/config-templates

- **Custom Formats**<br/>
  Custom formats that are added to the pre-built configuration file directly - i.e., not by way of
  an include - allow the user to choose from one or more profile variations. These choices mirror
  those described on the TRaSH Guides profile pages. Comments are provided in the pre-built
  configuration files, although these are supplementary in nature and the relevant guide profile
  page should be consulted for full information.

## Deployment

The pre-built configuration files can be deployed in two ways:

- Via the CLI using [`recyclarr config create -t`][cli].
- Manually, by copying the contents of the relevant pre-built configuration file into a [supported
  file location][file-structure]. The files can be found in the index below.

## Customization

:::warning

The pre-built configuration files are designed as a simple mechanism to deploy one or more of the
TRaSH Guides profiles, in exactly the same configuration as they appear on the guides pages. Minimal
customization is possible, however more extensive customization usually necessitates building your
own custom configuration file.

:::

:::warning

At this time, include templates can only be used with quality profiles that have the **same name**
as shown in the equivalent guide profile page. The profile name is hard-coded into the include
template.

:::

As the pre-built configuration files feature include templates, these will need to be overridden by
custom configuration added to the configuration file. [Guidance is available on this
behavior][behavior].


A common request is to add additional qualities to a [quality profile][config-qp]. This is as simple
as writing your own complete quality profile configuration and adding it to your configuration file.
From there, the quality profile include template can either be commented out, or if left enabled
then Recyclarr will process the customized configuration as described in the [include behavior
section][include-qp].

Additional custom formats can be added to the configuration file in the same way as normal.

[cli]: ./cli/config/config-create.md#template
[file-structure]: ./file-structure.md#default-yaml
[behavior]: ./behavior/include.md
[config-qp]: ./yaml/config-reference/quality-profiles.md
[include-qp]: ./behavior/include.md#quality-profiles
