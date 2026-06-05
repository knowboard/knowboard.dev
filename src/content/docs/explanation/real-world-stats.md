---
title: Real-world stats
---

This is a collection of stats from my own personal Knowboard workspace. My
workspace combines project planning across personal and work tasks, along with
many references that I want to save.

I first brought in some existing content from Notion, but at the time of
writing, this workspace has evolved over the last ~6 months as Knowboard has
taken shape.

## Structure

This is a rough outline of how my documents are structured:

- Projects
  - Action items
- Reference
  - Topics — _used to categorize references_
  - Notes
  - Media — _learning materials like videos and articles_
  - Entertainment — _books, movies, etc._
  - Tools — _resources for things like software libraries or applications that may be useful_
- Reviews
  - Daily
  - Weekly
  - Monthly

## Performance

As my workspace has grown, it's important to me to keep the experience snappy
and responsive. These are averages across my recent usage on a
2020 MacBook Air M1:

- **Document size:** 43MB
- **Memory usage:** ~150-200MB
- **Initial workspace scan:** 8.56s
- **Hover latency:** 10.8 ms

## File types

The vast majority of my files are Markdown documents, though the handful of
other data files contain a large number of RDF tuples:

| Type          |     Files |      Quads |
| ------------- | --------: | ---------: |
| Markdown docs |     1,573 |     18,077 |
| Data files    |         6 |     58,864 |
| **Total**     | **1,579** | **76,941** |

<details>
<summary>SPARQL</summary>

```sparql
SELECT ?kind ?files ?quads WHERE {
  {
    SELECT ?kind (COUNT(DISTINCT ?graph) AS ?files) (COUNT(*) AS ?quads) WHERE {
      GRAPH ?graph { ?s ?p ?o }
      BIND(IF(STRENDS(STR(?graph), ".md"), "Markdown docs", "Data Files") AS ?kind)
    } GROUP BY ?kind
  }
  UNION
  {
    SELECT ("Total" AS ?kind) (COUNT(DISTINCT ?graph) AS ?files) (COUNT(*) AS ?quads) WHERE {
      GRAPH ?graph { ?s ?p ?o }
    }
  }
}
ORDER BY (STR(?kind))
```

</details>

## Data files

One data file is `.yamlld` to store common workspace `@context` which is
referenced by the Markdown documents.

The others are Turtle `.ttl` files for storing schemas and other data

| Type                                                                        |  Quads |
| --------------------------------------------------------------------------- | -----: |
| [schema.org](https://schema.org/version/latest/schemaorg-current-https.ttl) | 17,826 |
| Workspace shapes & schema                                                   |  1,168 |
| Calendar [^1]                                                               |    527 |
| Other personal data sources [^2]                                            | 39,362 |

[^1]: exported from iCal to RDF containing a sliding 3 week window of events

[^2]: experiments with importing other data like sleep and activity tracking

I currently have 15 SHACL Shapes covering my common document types in the
workspace with the expected properties.

<details>
<summary>SPARQL</summary>

```sparql
PREFIX sh: <http://www.w3.org/ns/shacl#>
SELECT (COUNT(DISTINCT ?shape) AS ?shapes)
WHERE {
  { ?shape a sh:NodeShape . } UNION
  { ?shape a sh:PropertyShape . } UNION
  { ?shape a sh:Shape . }
}
```

</details>
