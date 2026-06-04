---
title: Data Files
---

Markdown documents are useful when you want to write more about the subject, but sometimes it's helpful to describe multiple different subjects in the same file.

Now, let's suppose we want to add information about the authors, but rather
than making a new document for every author, we just want to record them all
in one place. Instead of using Markdown, we can write the data in a `.yamlld`
file describing multiple authors:

```yaml title="authors.yamlld"
"@context":
  "@base": tag:me@example.com,2026:my-workspace/authors/
  schema: http://schema.org/

"@graph":
  - "@id": f-scott-fitzgerald
    "@type": schema:Person
    schema:name: F. Scott Fitzgerald

  - "@id": jane-austen
    "@type": schema:Person
    schema:name: Jane Austen
```

:::tip[File formats]
Knowboard supports most of the common file formats for RDF data, including [Turtle](https://www.w3.org/TR/turtle/) and [N-Triples](https://www.w3.org/TR/n-triples/). These each can have their advantages, but we'll mostly stick to YAML-LD for consistency since that is supported in the Markdown files.
:::

<!--
XXX
using @vocab might be nice, though then it also applies to the @id values
we could use a separate prefix for those, but maybe introducing prefixes is
simpler here?
-->

Here we specify `schema: http://schema.org/` as a different style of shorthand to the `@vocab` pattern above to let us be more explicit about where these terms are defined.

The `@base` specifies the base URL for the contents, which is combined with the `@id` of the individual records to provide each a unique identifier, like `tag:me@example.com,2026:my-workspace/authors/jane-austen`

We can update our book document to refer to an author:

```md ins={4,7-8} title="books/pride-and-prejudice.md"
---
"@context":
  "@vocab": http://schema.org/
  kbex: tag:me@example.com,2026:my-workspace/
"@type": Book
name: Pride and Prejudice
author:
  "@id": kbex:authors/jane-austen
---
```

:::tip[Code intelligence]
Hover previews work on references in the document properties too!

<video autoplay muted loop playsinline>
  <source src="../../../recordings/hover-jane-austen-basic.mp4" type="video/mp4" />
</video>
:::
