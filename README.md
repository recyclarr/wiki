# Recyclarr Website / Wiki

This is the website for [Recyclarr](https://github.com/recyclarr/recyclarr), built using
[Docusaurus](https://docusaurus.io/), a modern static website generator.

## Contributing

Contributors must follow these guidelines.

### Editor

I personally use Visual Studio Code to edit my markdown files. I encourage you use this editor as
well. There's a list of recommended extensions in the workspace VS Code settings that you should
install to make editing files here an easier experience.

If you do not want to use VS Code, that's fine too, but be prepared to potentially do
style/formatting changes by hand. It's also possible that we spend more time on formatting/style
issues in pull requests too.

### Markdown Lint

Markdown lint rules must be followed. See [`.markdownlint.json`](.markdownlint.json). I personally
use the [markdownlint] extension for VS Code.

Each pull request opened will run a workflow to verify markdownlint rules are not violated.

[markdownlint]: https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint

### Table Formatting

Markdown tables must be formatted and aligned.

The VS Code extension named [Markdown All In One][mdaio] can be used to automatically resize and
reformat markdown tables. Workspace settings already have this extension set up as the default
formatter for markdown files. Simply do a "Reformat Document" operation to have your tables fixed
up.

[mdaio]: https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one

### Line Length & Wrapping

Max line length is 100. Hard wraps must be used instead of soft wraps.

The [Rewrap] extension in VS Code can assist with wrapping. Simply put your caret in a paragraph
that needs to be hard-wrapped and press `ALT+Q`.

[Rewrap]: https://marketplace.visualstudio.com/items?itemName=stkb.rewrap

### Version Requirements

When documenting features, especially when that feature has not been released yet, it's important to
call out specific version requirements. There's almost always a minimum version requirement.

Using the `:::note` admonition, follow the example below to point out the minimum version required.
Typically this should be done at the top of a section under a heading or page that describes the
feature.

Example:

```md
:::note Version Requirement

This functionality requires `v3.0.0` or greater!

:::
```

### Admonitions

Admonitions are the colored sections of text in the guide (Info, Caution, etc). Docusaurus documents
its admonitions [here](https://docusaurus.io/docs/markdown-features/admonitions). For consistency,
please use the general guidelines below to know which admonition types to use in what situation.

- 🔵 **INFO** (`:::info`)<br/>
  Optional steps, informational text. Directly related to the subject matter.

- 🟢 **TIP** (`:::tip`)<br/>
  Advice or tips that help the user. Topics might not be directly related to surrounding subject
  matter.

- 🟡 **CAUTION** (`:::caution`)<br/>
  Warning messages about an action or piece of information. Things the user should heed, but it
  won't be the end of the world if they don't.

- 🔴 **DANGER** (`:::danger`)<br/>
  Most critical admonition. Represents things the user *should not do*.

Additionally, admonitions should have spaces before and after the text inside of it. For example:

```md
:::tip

This is a tip

:::
```

Don't squeeze it all together like this:

```md
:::tip
This is a tip
:::
```

Reason: Some formatting tools will wrap the latter example all onto one line, like below. Having the
spaces prevents this.

```md
:::tip This is a tip:::
```

## Development

### Installation

To install everything:

```sh
yarn
```

To upgrade Docusaurus to latest:

```sh
yarn upgrade @docusaurus/core@latest @docusaurus/preset-classic@latest
```

### Local Development

```sh
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are
reflected live without having to restart the server.

### Build

```sh
yarn build
```

This command generates static content into the `build` directory and can be served using any static
contents hosting service.
