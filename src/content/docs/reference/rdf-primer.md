---
title: RDF Primer
# description:
---

The [Resource Description Framework](https://en.wikipedia.org/wiki/Resource_Description_Framework) is a way to describe graph data. RDF is not one specific technology, but an ecosystem of a number of complementary ways of working with data. It includes a variety of file formats, querying support, and patterns for describing data.

This document aims to cover the RDF fundamentals to start working with Knowboard. Users that wish to can incorporate more in-depth use of RDF, but the concepts described here form the core of Knowboard.

## JSON-LD / YAML-LD

JSON Linked Data ([JSON-LD](https://www.w3.org/TR/json-ld/)) (`.jsonld`) defines an format RDF written in the JavaScript Object Notation.

[YAML-LD](https://w3c.github.io/yaml-ld/) (`.yamlld`) is based on JSON-LD, but uses the YAML format, aiming to be more "human-readable" by reducing the amount of puncutation and special characters needed.

:::note
The YAML-LD spec is still a "Working Draft" and has not been finalized. However, Knowboard does not support any YAML-specific features. YAML-LD content is first converted to JSON, and then handled as JSON-LD.
:::

## Markdown

Markdown has a convention for including metadata as a "frontmatter" block at the beginning of the file, delimited by `---` markers:

```md
---
meta: data
keys: and values
---
```

Many tools expect the frontmatter to contain YAML (though some tools support other formats). In Knowboard, the frontmatter is expected to be YAML, and is converted to RDF via the YAML-LD format described above.

## Turtle

[Turtle](https://www.w3.org/TR/turtle/) (`.ttl`, "Terse RDF Triple Language") is another file format for writing RDF. Turtle is designed to be a compact format and human-readable, so many RDF examples found online are provided in Turtle syntax.

## SPARQL

See the [SPARQL reference docs](../sparql/)

## SHACL

https://www.w3.org/TR/shacl/
Shapes Constraint Language
