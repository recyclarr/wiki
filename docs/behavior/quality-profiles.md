---
id: quality-profiles
title: Quality Profiles
---

## Quality Sort Modes {#sort-modes}

The [`quality_sort` property][qpsort] supports various different sort algorithms. Before we dive
into the differences between these sort algorithms and why you would choose one or the other, we
need a basic understanding of why quality ordering matters in the first place.

### Why Order Matters {#order-matters}

It's important to know that even when a quality is disabled in your quality profile, *its order
still matters* for the following reasons:

- Manual search results, by default, are sorted based on the order of the qualities in your quality
  profile.
- Whether a cutoff is met or not is still impacted by disabled qualities.

Because disabled (disallowed) qualities are not technically non-functional, the sort mode exists to
give you some flexibility in how those disabled qualities impact you when they're missing from the
[`qualities` list][qpqualities] in your configuration YAML.

[qpsort]: /yaml/config-yml-reference.md#qp-quality-sort
[qpqualities]: /yaml/config-yml-reference.md#qp-qualities

### Top Sort {#top-sort}

When `quality_sort` is set to `top` (which is also the *default* if you do not specify this
property), qualities and groups you *explicitly specify* in your YAML are sorted to the top of the
list. *Unspecified* qualities appear at the bottom.

:::caution Impact on Cutoff

If qualities are removed instead of disabled, this can cause unwanted downgrades of movie files.

:::

#### Example

<details><summary>Click to Expand Example</summary>

```yml
quality_sort: top
qualities:
  - name: Remux-1080p
  - name: Bluray-1080p
    enabled: false
  - name: Bluray-720p
  - name: WEB 720p
    qualities:
      - WEBRip-720p
      - WEBDL-720p
  - name: DVD
```

When you sync this quality profile, it will look like this when you view it in the Radarr UI:

<img src={require('./img/top-sort.png').default} width="350" />

</details>

### Bottom Sort {#bottom-sort}

When `quality_sort` is set to `bottom`, qualities and groups you *explicitly specify* in your YAML
are sorted to the bottom of the list. *Unspecified* qualities appear at the top.

:::caution Impact on Cutoff

If qualities are removed instead of disabled, this can result in upgrades never happening.

:::

#### Example

<details><summary>Click to Expand Example</summary>

Using the same example YAML from the previous section:

```yml
quality_sort: bottom
qualities:
  - name: Remux-1080p
  - name: Bluray-1080p
    enabled: false
  - name: Bluray-720p
  - name: WEB 720p
    qualities:
      - WEBRip-720p
      - WEBDL-720p
  - name: DVD
```

Syncing this will yield the following qualities list when you view them from the Radarr UI:

<img src={require('./img/bottom-sort.png').default} width="350" />

</details>
