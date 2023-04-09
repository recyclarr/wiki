---
id: release-profiles
title: Release Profiles
---

## Naming

The script procedurally generates a name for release profiles it creates. For the following example:

```txt
[Trash] Anime - First Release Profile
```

The name is generated as follows:

- `[Trash]` is added by Recyclarr to indicate that this Release Profile is created and managed by
   it. This prefix exists to separate it from any Release Profiles the user may have manually
   created (which Recyclarr will not touch).
- `Anime - First Release Profile` is the name of the Release Profile (taken from the `name` property
  of its corresponding JSON file).
