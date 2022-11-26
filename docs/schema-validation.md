---
id: schema-validation
title: Schema Validation
---

Various YAML files in Recyclarr have accompanying schema files that can be used to validate changes.
This is incredibly useful for debugging issues with those YAML files as well as making editing them
much easier. You should be interested in this topic if any of the following points apply to you:

- You like to edit your YAML files in [Visual Studio Code](https://code.visualstudio.com/).
- You want in-editor documentation for various YAML elements as well as which properties can be used
  where.
- You want to easily spot errors in your YAML documents in response to parsing errors when running
  Recyclarr or in real time as you edit.

:::info What's a Schema?

A *schema*, in this case, defines the shape that YAML must conform to. It's a `json` file that
describes the different parts of YAML settings, configuration, and other files that Recyclarr uses.

Schema *validation* refers to the process of using the schema itself to check for issues in your
YAML files.

If you're not a techy-type and any of that makes you dizzy, that's OK. You don't need to worry too
much about the specifics. Use the sections below to set up schema validation in VS Code that will
help you get all the benefits listed above.

:::

## Setting Up VS Code

First you must prepare Visual Studio Code for editing YAML and validating using schemas.

1. If you don't already have it, [install][vs-code-setup] VS Code. It's available on most platforms.
1. Install the [YAML Extension][yaml] in VS Code. Don't know how to install extensions? [Watch
   this][vs-code-ext-inst].

## Enable Schema Validation

To enable schema validation for a particular YAML file that Recyclarr uses, you must add a comment
to the very top (line 1) of the file you're editing. This comment will be different depending on the
type of YAML file. To find the correct comment to use, refer to the respective YAML reference page
linked below.

- [Configuration YAML] &mdash; Applies to `recyclarr.yml` or any YAML files under the `configs`
  subdirectory
- [Settings YAML] &mdash; Applies to `settings.yml`

After adding the comment to the top, you should begin to see contextual editing features as you
edit. It will suggest properties you can use and show you documentation for each without having to
reference the corresponding reference page.

## Secrets

If you are editing YAML in VS Code and using `!secret` references, you will get "Unknown Tag"
errors. Remove them by adding the following to VS Code's `settings.json` file ([VS Code
Documentation][vs-code-settings]):

```json
  "yaml.customTags": [
    "!secret scalar"
  ]
```

[vs-code-settings]: https://code.visualstudio.com/docs/getstarted/settings
[vs-code-setup]: https://code.visualstudio.com/docs/setup/setup-overview
[vs-code-ext-inst]: https://code.visualstudio.com/learn/get-started/extensions
[yaml]: https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml
[Configuration YAML]: /reference/config-yml-reference.md#schema
[Settings YAML]: /reference/settings-reference.md#schema
