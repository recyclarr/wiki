---
id: include
title: YAML Includes
---

## Terminology {#terms}

### Recyclarr-Specific Terms {#recyclarr-terms}

- **Include Template**<br/>
  A type of template that may *only* be included.

- **Config Template**<br/>
  A type of template that may *only* be used as a configuration file. It *cannot* be included. May
  be created with the `config create` command.

- **Include Directive**<br/>
  A specific method of including a YAML file (e.g. `config: myfile.yml`). The [reference
  docs][includeref] contain a comprehensive list of all include directives.

[includeref]: /yaml/config-reference/include.md

### YAML-Specific Terms {#yaml-terms}

Most of these definitions were taken verbatim from the [official YAML glossary][yamlglossary]. This
list of terms is not comprehensive. It only touches on terms that are relevant to understanding
Recyclarr's include YAML merge behavior.

- **Sequence**<br/>
  A *sequence* is a collection that is an ordered list of 0 or more nodes.

  ```yml
  - one
  - two
  - three
  ```

- **Mapping**<br/>
  A *mapping* is a collection that consists of a set of 0 or more key/value pairs. In YAML, both the
  key and the value can be any kind of node.

  ```yml
  one: "one value"
  two: 2
  three: "3"
  ```

- **Scalar**<br/>
  A *scalar* is a node that consists of a single value unit. Strings, numbers and boolean values are
  examples of scalar nodes. In the example below, the value `true` is considered a scalar value.

  ```yml
  delete_old_custom_formats: true
  ```

[yamlglossary]: https://yaml.com/doc/glossary/

## Include YAML Schema {#schema}

Unlike configuration files, YAML that is included uses a simplified schema (structure). Normally, in
a typical configuration file, you have a structure like this:

```yml
radarr:
  instance_name:
    base_url: http://localhost:7878
    api_key: the_key

    custom_formats:
      - trash_ids:
          - id1
          - id2
```

Since included YAML is only capable of adding information to *specific instance configurations*,
they do not contain a service type (e.g. `radarr`) or an instance name (e.g. `instance_name`). If we
convert the above example into a YAML file that may be included, it would look like this:

```yml
custom_formats:
  - trash_ids:
      - id1
      - id2
```

You essentially start an include file as if it's everything under `instance_name`. The properties
`base_url` and `api_key` have been omitted for reasons described later.

## Include Precedence {#precedence}

Recyclarr handles includes using the following rules:

1. Includes are processed from top to bottom, in order. Configuration is merged using specific
   strategies discussed in the sections [Merge Operations](#operations) and [Merge
   Reference](#reference).
1. The root configuration is merged into the final, aggregated include configuration data. Root
   configuration YAML always takes precedence over included YAML.

## Merge Behavior {#behavior}

Merge behavior is described in terms of two sides: `A` and `B`. Side `A` typically represents the
*current merged state* of the included YAML at any point. Side `B` is the YAML data to include next.

As Recyclarr visits each node in included YAML, it decides what to do based on the following logic.

1. If `B` has a node but not `A`, then it takes the node from `B`.
1. Otherwise, if `A` has a node but not `B`, then it takes the node from `A`.
1. Otherwise, if both sides (`A` and `B`) have the same node, then a pre-determined *Merge
   Operation* is used.

Recyclarr uses *Merge Operations* to decide how to aggregate (combine/merge) YAML data that exists
in two YAML files. These operations are important to understand as they are used in the [Merge
Reference](#reference) section that follows.

Before getting into the specifics of each operation, it's important to understand some YAML-specific
terminology. See the [Terminology](#yaml-terms) section to learn more.

### Add {#add}

This merge operation involves concatenating two *sequences* together. As such, it only applies to
sequences. The end result is `B` is simply appended to `A`. The example below demonstrates the
behavior for the sequences under `custom_formats`.

```yml
# A
custom_formats:
  - trash_ids:
      - 496f355514737f7d83bf7aa4d24f8169  # TrueHD Atmos
      - 2f22d89048b01681dde8afe203bf2e95  # DTS X

# B
custom_formats:
  - trash_ids:
      - 570bc9ebecd92723d2d21500f4be314c  # Remaster
      - eca37840c13c6ef2dd0262b141a5482f  # 4K Remaster
      - e0c07d59beb37348e975a930d5e50319  # Criterion Collection

# A + B
custom_formats:
  - trash_ids:
      - 496f355514737f7d83bf7aa4d24f8169  # TrueHD Atmos
      - 2f22d89048b01681dde8afe203bf2e95  # DTS X
  - trash_ids:
      - 570bc9ebecd92723d2d21500f4be314c  # Remaster
      - eca37840c13c6ef2dd0262b141a5482f  # 4K Remaster
      - e0c07d59beb37348e975a930d5e50319  # Criterion Collection
```

### Join {#join}

A join involves two *sequences* of *mappings*. Based on some key, such as a `name` property, two
sequences are joined together. If sequence `B` has a key that matches any key in sequence `A`, then
those two mappings are *combined* (see [Union](#union)). For mappings in sequence `B` that have *no
match*, the behavior is effectively the same as [Add](#add).

```yml
# A
quality_profiles:
  - name: Bluray|WEB-1080p
    score_set: sqp-1-1080p

# B
quality_profiles:
  - name: Bluray|WEB-1080p
    min_format_score: 1000
  - name: Remux + WEB 1080p
    min_format_score: 0

# A + B
quality_profiles:
  - name: Bluray|WEB-1080p
    min_format_score: 1000
    score_set: sqp-1-1080p
  - name: Remux + WEB 1080p
    min_format_score: 0
```

### Union {#union}

A *union* involves combining two *mappings* together. Matching properties (keys) in the mapping have
their own merge operations that might be a [replace](#replace), [add](#add), [join](#join), or
another union (recursive). It depends on the type of the nodes (properties) and which merge
operation is [assigned to that node](#reference).

```yml
# A
quality_definition:
  type: movie

# B
quality_definition:
  preferred_ratio: 0.5

# A + B
quality_definition:
  type: movie
  preferred_ratio: 0.5
```

### Replace {#replace}

A *replace* operation results in `B` completely overwriting (replacing) `A`. This can happen to any
YAML node type, but typically applies to *scalars*.

```yml
# A
delete_old_custom_formats: true

# B
delete_old_custom_formats: false

# A + B
delete_old_custom_formats: false
```

## Merge Reference {#reference}

This section documents the *merge operation* used for all configuration values. Note that this first
table just covers top-level properties for instance configuration. If nested properties have merge
semantics, those will be documented in later sections. This will especially be the case for
[union](#union) operations.

| Property Name                     | Node Type            | Merge Operation |
| --------------------------------- | -------------------- | --------------- |
| `custom_formats`                  | Sequence             | Add             |
| `quality_profiles`                | Sequence of Mappings | Join            |
| `quality_definition`              | Mapping              | Union           |
| `delete_old_custom_formats`       | Scalar               | Replace         |
| `replace_existing_custom_formats` | Scalar               | Replace         |
| `release_profiles`                | Sequence             | Add             |

### Quality Definition {#quality-definition}

| Property Name     | Node Type | Merge Operation |
| ----------------- | --------- | --------------- |
| `type`            | Scalar    | Replace         |
| `preferred_ratio` | Scalar    | Replace         |

### Quality Profiles {#quality-profiles}

| Property Name            | Node Type | Merge Operation |
| ------------------------ | --------- | --------------- |
| `upgrade`                | Mapping   | Union           |
| `min_format_score`       | Scalar    | Replace         |
| `quality_sort`           | Scalar    | Replace         |
| `score_set`              | Scalar    | Replace         |
| `reset_unmatched_scores` | Mapping   | Union           |
| `qualities`              | Sequence  | Replace         |

Merge operations for properties of `upgrade`:

| Property Name   | Node Type | Merge Operation |
| --------------- | --------- | --------------- |
| `allowed`       | Scalar    | Replace         |
| `until_quality` | Scalar    | Replace         |
| `until_score`   | Scalar    | Replace         |

Merge operations for properties of `reset_unmatched_scores`:

| Property Name | Node Type | Merge Operation |
| ------------- | --------- | --------------- |
| `enabled`     | Scalar    | Replace         |
| `except`      | Sequence  | Add             |

## Unsupported Properties {#unsupported}

The following properties are **not supported** for inclusion. If these properties are present in
included YAML data, you will usually see a warning message printed to the console.

- `base_url`
- `api_key`
- `include`

## Tips & Information {#tips}

### Include File Structure {#file-structure}

This section covers the currently recommended file structure for local YAML includes.

Recyclarr does not recursively scan for configuration YAML files in the [`configs`
subdirectory][configdir]. This means that you can structure local include YAML files into
subdirectories inside `configs`. This allows the convenient usage of relative paths when using the
[`config` include directive][configdirective].

As an example, consider this file structure:

```txt
.
└── configs/
    ├── includes/
    │   └── reusable.yml
    └── my-config.yml
```

And the `my-config.yml` file has the following include directives:

```yml
include:
  - config: includes/reusable.yml
```

Because we have our includes within the `configs` directory, we can easily access them with a
relative path. And since those includes are under a subdirectory, Recyclarr will not scan them and
treat them as top-level configuration YAML files.

[configdir]: /file-structure.md#config-directory
[configdirective]: /yaml/config-reference/include.md#config

### Managing Quality Profile `qualities` {#managing-qualities}

Even though `qualities` is a YAML Sequence, it uses a Replace merge operation. The reason for that
has to do with the fact that qualities are very "high-stakes". This means that changes to your
qualities have the ability to impact your entire media library. So it's important to make sure that
include directives don't make your qualities list difficult or confusing to get right. While
Recyclarr certainly could support some sort of "Join" / "Add" combination of behavior for the list
of qualities, doing so would not only be confusing but very error-prone.

If we were to combine two lists of qualities are combined together, the user would not have the
ability to specify the relative ordering of those qualities. "Add" merge operations are a simple "A
\+ B" concatenation. That is to say, qualities you add are simply appended to the bottom of the
list. You can't order them any other way.

So, even though a "Replace" operation may yield more redundancy (you have to specify qualities from
an included YAML that you otherwise don't care about), it's *safer* because you can see the entire
list of qualities in one place *and* can ensure the ordering is exactly as you expect.
