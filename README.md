# Recyclarr Website / Wiki

This is the website for [Recyclarr](https://github.com/recyclarr/recyclarr), built using
[Docusaurus](https://docusaurus.io/), a modern static website generator.

## Contributing

Contributors must follow these guidelines.

### Markdown Lint

Markdown lint rules must be followed. See [`.markdownlint.json`](.markdownlint.json). I personally
use the [markdownlint] extension for VS Code.

Each pull request opened will run a workflow to verify markdownlint rules are not violated.

[markdownlint]: https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint

### Admonitions

Admonitions are the colored sections of text in the guide (Info, Caution, etc). Docusaurus documents
its admonitions [here](https://docusaurus.io/docs/markdown-features/admonitions). For consistency,
please use the general guidelines below to know which admonition types to use in what situation.

- ⚫ **NOTE** (`:::note`)<br/>
  Do not use.

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

```sh
yarn
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
