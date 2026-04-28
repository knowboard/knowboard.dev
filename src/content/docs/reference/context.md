---
title: Context
# description: A reference page in my new Starlight docs site.
---

The context provides a mapping for terms that can be used in the document. For additional details, see the
[JSON-LD spec](https://www.w3.org/TR/json-ld/#the-context).

## Defining terms

A term can be defined to provide a shorthand:

```md
---
"@context":
  name: http://schema.org/name
name: "Example"
---
```

Terms can also be used as prefixes:

```md
---
"@context":
  schema: http://schema.org/
schema:name: "Example"
---
```

Prefixes can also be used to define context terms:

```md
---
"@context":
  schema: http://schema.org/
  name: schema:name
name: "Example"
---
```

## Specifying types

A term can also include the `@type` keyword to specify the datatype, in which case `@id` should be used to specify the IRI the term refers to:

```md
---
"@context":
  schema: http://schema.org/
  dateCreated:
    "@id": schema:dateCreated
    "@type": schema:Date

dateCreated: "2026-04-27"
---
```

## Workspace context files

A context can be defined within a workspace file:

```yaml title="context.yamlld"
"@context":
  schema: http://schema.org/
  xsd: http://www.w3.org/2001/XMLSchema#
```

Documents can use the workspace-relative IRI to include the context:

```md title="document.md"
---
"@context": http://example.knowboard.dev/context.yamlld
schema:name: "Example document"
---
```

:::note
At this time the `@context` URL will only load from workspace-local files. No remote data will be accessed.
:::

Contexts can be combined to reference a workspace context as well as additional inline context:

```yaml title="document.md"
---
"@context":
  - http://example.knowboard.dev/context.yamlld
  - name: schema:name
name: "Example document"
---
```
