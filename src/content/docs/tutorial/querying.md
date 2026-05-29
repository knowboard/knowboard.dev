---
title: Querying
---

While some of the property definition in the example may have felt a bit verbose
(we'll get into more patterns later to help manage the redundancy), but it
starts to pay off by the expressiveness from being able to query all the
information in your workspace.

First, let's update the workspace config file to tell Knowboard we want to
enable the SPARQL server:

```toml ins={3-5} title=".knowboard.toml"
# ...
exclude = [".git/**"]

[sparql_server]
listen = "auto" # or specific port like "17878"
```

:::note
The value "auto" tells Knowboard to pick an arbitrary available port at startup.
This is helpful in avoiding port conflicts, but also means the port will change
each time you restart Knowboard. You can provide a specific port number as well,
but this will need to be unique for each of your workspaces.
:::

Knowboard provides a simple web-based SPARQL UI. The UI can be opened using the VSCode Command Pallete:

```
Cmd+Shift+P (Mac)
Ctrl+Shift+P (Windows)

> KnowBoard: Open SPARQL UI
```

Or if you have a specific port defined, you can navigate directly to it in the browser, such as `http://localhost:17878`.

Knowboard can also be used with a variety of standard [SPARQL clients](../../reference/sparql-clients/)

## Testing a query

In SPARQL the basic "show me everything" query looks like this:

```sparql
SELECT * WHERE { ?subject ?predicate ?object } LIMIT 3
```

This should return a selection of the information we've defined in the workspace like:

| subject                                                         | predicate                                       | object                   |
| --------------------------------------------------------------- | ----------------------------------------------- | ------------------------ |
| tag:me@example.com,2026:my-workspace/authors/jane-austen        | http://schema.org/name                          | Jane Austen              |
| tag:me@example.com,2026:my-workspace/authors/jane-austen        | http://www.w3.org/1999/02/22-rdf-syntax-ns#type | http://schema.org/Person |
| tag:me@example.com,2026:my-workspace/authors/f-scott-fitzgerald | http://schema.org/name                          | F. Scott Fitzgerald      |

## Structuring the results

To get something more insightful, SPARQL enables us to query the structure and connections between different items, such as associating book titles with the author's name:

```sparql title="query.rq"
PREFIX schema: <http://schema.org/>

SELECT ?bookName ?authorName WHERE {
  ?book a schema:Book ;
        schema:name ?bookName ;
        schema:author ?author .
  ?author schema:name ?authorName .
}
```

| bookName            | authorName          |
| ------------------- | ------------------- |
| The Great Gatsby    | F. Scott Fitzgerald |
| Pride and Prejudice | Jane Austen         |

See the references for additional [SPARQL resources](../../reference/rdf-primer/#sparql).
