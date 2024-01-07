---
id: git-install
title: Install Git on Windows
---

This is a walkthrough for installing Git on Windows.

## Installation

Using [Winget CLI](https://winget.run/pkg/Git/Git):

```cmd
winget install git
```

Using [Chocolatey](https://community.chocolatey.org/packages/git):

```cmd
choco install git
```

Or use the official [Git for Windows installer](https://gitforwindows.org/). If you decide to use
the installer, see the section below for important installation instructions.

### Git for Windows Installer

:::info

Skip this section if you're using Chocolatey or Winget methods.

:::

:::warning

Before proceeding, **close any open terminal windows** such as Powershell and CMD/Command Prompt.
The Git installer will modify your `PATH` environment variable. Terminals will not reload updates to
this variable while they are open!

:::

1. Download and run the installer from [here](https://gitforwindows.org/).

1. During the installation wizard, keep all options at their defaults.

1. When you reach the page of the wizard pictured below, ensure that the shown option is selected
   (again, this should be selected by default):

   ![img](/doc-img/git-setup-add-path.png)

1. Once the installer completes, you should be able to run Recyclarr.
