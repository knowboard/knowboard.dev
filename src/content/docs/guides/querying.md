---
title: Querying
---

While some of the property definition in the example may have felt a bit verbose
(we'll get into more patterns later to help manage the redundancy), but it
starts to pay off by the expressiveness from being able to query all the
information in your workspace.

First, let's update the workspace config file to tell Knowboard we want to
listen on a specific port:

```toml ins={3-5} title=".knowboard.toml"
# ...
exclude = [".git/**"]

[sparql_server]
listen = "17878"
```

:::note
If you have multiple workspaces that you want to query, you will need to specify
a different port for each one to listen on. Future Knowboard tools will enable
querying support directly within the tools, but for now querying requires
an external client.
:::

The server works with common SPARQL clients like [comunica-sparql](https://comunica.dev/docs/query/getting_started/query_cli/) which we'll use for the examples:
```sh
$ npm install -g @comunica/query-sparql
$ comunica-sparql http://localhost:17878/sparql -t table 'SELECT ?s ?p ?o WHERE { ?s ?p ?o }'
s                                                  p                                                  o
--------------------------------------------------------------------------------------------------------------------------------------------------------
https://example.knowboard.dev/authors/jane-austen  http://schema.org/name                             Jane Austen
https://example.knowboard.dev/authors/jane-austen  http://www.w3.org/1999/02/22-rdf-syntax-ns#type    http://schema.org/Person
https://example.knowboard.dev/authors/f-scott-fit… http://schema.org/name                             F. Scott Fitzgerald
https://example.knowboard.dev/authors/f-scott-fit… http://www.w3.org/1999/02/22-rdf-syntax-ns#type    http://schema.org/Person
https://example.knowboard.dev/books/great-gatsby   http://www.w3.org/1999/02/22-rdf-syntax-ns#type    http://schema.org/Book
https://example.knowboard.dev/books/great-gatsby   http://schema.org/name                             The Great Gatsby
https://example.knowboard.dev/books/great-gatsby   http://schema.org/author                           https://example.knowboard.dev/authors/f-scott-fit…
https://example.knowboard.dev/books/pride-and-pre… http://schema.org/author                           https://example.knowboard.dev/authors/jane-austen
https://example.knowboard.dev/books/pride-and-pre… http://schema.org/name                             Pride and Prejudice
https://example.knowboard.dev/books/pride-and-pre… http://www.w3.org/1999/02/22-rdf-syntax-ns#type    http://schema.org/Book
```

Listing out all of the data in the workspace is still quite verbose, so let's
write a more specific query:

```sparql title="query.rq"
PREFIX schema: <http://schema.org/>

SELECT ?bookName ?authorName WHERE {
  ?book a schema:Book ;
        schema:name ?bookName ;
        schema:author ?author .
  ?author schema:name ?authorName .
}
```

```sh
$ comunica-sparql http://localhost:17878/sparql -t table -f query.rq
bookName                   authorName
------------------------------------------------
The Great Gatsby           F. Scott Fitzgerald
Pride and Prejudice        Jane Austen
```

This documentation will focus mainly on Knowboard-specific patterns for using
SPARQL, but there are other general guides to learn more about the query
language itself.
