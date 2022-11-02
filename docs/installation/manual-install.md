---
id: manual-install
title: Manual Installation
sidebar_position: 2
---

Simply download the latest release for your platform using the table below. The download itself is
just a ZIP file with a single executable in it. You can put this executable anywhere you want and
run it.

| Platform | 32-bit           | 64-bit                                 |
| -------- | ---------------- | -------------------------------------- |
| Windows  | ---              | [x64][win-x64], [arm64][win-arm64]     |
| Linux    | [arm][linux-arm] | [x64][linux-x64], [arm64][linux-arm64] |
| Mac OS   | ---              | [x64][osx-x64], [arm64][osx-arm64]     |

[win-x64]: https://github.com/recyclarr/recyclarr/releases/latest/download/recyclarr-win-x64.zip
[win-arm64]: https://github.com/recyclarr/recyclarr/releases/latest/download/recyclarr-win-arm64.zip
[linux-x64]: https://github.com/recyclarr/recyclarr/releases/latest/download/recyclarr-linux-x64.zip
[linux-arm64]: https://github.com/recyclarr/recyclarr/releases/latest/download/recyclarr-linux-arm64.zip
[linux-arm]: https://github.com/recyclarr/recyclarr/releases/latest/download/recyclarr-linux-arm.zip
[osx-x64]: https://github.com/recyclarr/recyclarr/releases/latest/download/recyclarr-osx-x64.zip
[osx-arm64]: https://github.com/recyclarr/recyclarr/releases/latest/download/recyclarr-osx-arm64.zip

The above links are from the latest release on the [releases page][rp]. Feel free to visit there for
release notes, additional architectures and platforms, and older releases.

[rp]: https://github.com/recyclarr/recyclarr/releases

## Prerequisites

- OpenSSL 1.x required on Linux

:::info

### Special Note about Linux

When you extract the ZIP archive on Linux, it will *not* have the executable permission set. After
you've downloaded and extracted the executable, you can use the command below to make it executable.

```bash
chmod u+rx recyclarr
```

:::
