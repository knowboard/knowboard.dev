---
title: Books
description: A guide in my new Starlight docs site.
---

# Configuring a workspace

Knowboard looks for a `.knowboard.toml` file to configure the workspace.
The location of this file is considered to be the "root" of the workspace.


```toml title=".knowboard.toml"
# The "base_uri" should be a unique URI to identify the documents in this
# workspace. It can be a public URL where these documents are hosted, but
# does not have to be.
base_uri = "https://example.knowboard.dev/"

# The default file extensions supported includes most commonly recognized
# RDF file formats, as well as Markdown.
include = [
  "**/*.md",
  "**/*.ttl",    # https://www.w3.org/TR/turtle/
  "**/*.jsonld", # https://www.w3.org/TR/json-ld/
  "**/*.yamlld", # https://www.w3.org/TR/yaml-ld/
  "**/*.nt",     # https://www.w3.org/TR/n-triples/
  "**/*.rdf",    # https://www.w3.org/TR/rdf-xml/
]
exclude = [".git/**"]
```

This initial config defines which file extensions to include and exclude,
along with a "base URI" which defines the namespace for the resources in the
workspace.

# Adding documents
Most of your content will be stored in Markdown files. Let's start with an entry to describe a book:

```md title="books/pride-and-prejudice.md"
---
# At the start of the file, this section between
# "---" markers defines structured properties about the document
"@context":
  "@vocab": http://schema.org/
"@type": Book
name: Pride and Prejudice
---

# Markdown body
Use the body of the document to add notes, or other content.
```

The properties are specified in a format called [YAML-LD](
https://w3c.github.io/yaml-ld/). We will save more details about the format for later, but for the examples, the key thing to understand is that the `@vocab` says where the terms used in the document are defined.

So, here `Book` corresponds to https://schema.org/Book, and `name` to
https://schema.org/name. You can (and should) also come up with your own
terminology, which we'll get into more later, but using well-defined terms from
sources like schema.org can help in structuring your data.

Let's add one more book to work with:

```md title="books/great-gatsby"
---
"@context":
  "@vocab": http://schema.org/
"@type": Book
name: The Great Gatsby
---
```

# Data files

Markdown documents are useful when you want to write more about the subject, but sometimes it's helpful to describe multiple different subjects in the same file.

:::tip[File formats]
Knowboard supports most of the common file formats for RDF data, including [Turtle](https://www.w3.org/TR/turtle/) and [N-Triples](https://www.w3.org/TR/n-triples/). These each can have their advantages, but we'll mostly stick to YAML-LD for consistency since that is supported in the Markdown files.
:::

We can add information about the authors for our books:

```yaml title="authors.yamlld"
"@context":
  "@base": https://example.knowboard.dev/authors/
  schema: http://schema.org/

"@graph":
- "@id": f-scott-fitzgerald
  "@type": schema:Person
  schema:name: F. Scott Fitzgerald

- "@id": jane-austen
  "@type": schema:Person
  schema:name: Jane Austen
```

Here we specify `schema: http://schema.org/` as a different style of shorthand to the `@vocab` pattern above to let us be more explicit about where these terms are defined.

The `@base` specifies the base URL for the contents, which is combined with the `@id` of the individual records to provide each a unique identifier, like `https://example.knowboard.dev/authors/jane-austen`

We can update our book document to refer to an author:

```md ins={4,7-8} title="books/pride-and-prejudice.md"
---
"@context":
  "@vocab": http://schema.org/
  kbex: https://example.knowboard.dev/
"@type": Book
name: Pride and Prejudice
author:
  "@id": kbex:authors/jane-austen
---
```

:::tip[Code intelligence]
Try hovering the mouse pointer over `kbex:authors/jane-austen` to see more information about the linked entry.
:::
