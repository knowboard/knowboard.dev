---
title: SPARQL
---

Knowboard uses the [SPARQL](https://www.w3.org/TR/sparql11-query/) language to query and modify data in the Knowledge Graph.

## Querying

### SPARQL files

Files with `.rq` or `.sparql` extensions are detected as SPARQL queries.

### Markdown embedding

Queries can also be embedded in Markdown code blocks with `sparql` specified as the language:

````md
```sparql
SELECT * WHERE {}
```
````

### Running queries

:::note
The [SPARQL server](../config/#sparql-server) must be enabled in the Workspace settings.
:::

The Language Server Protocol is currently limited in features to display query results, so read queries must be executed in the browser or another [client](#clients).

SPARQL queries will display a CodeLens `▶ Open in SPARQL UI` to open the built-in web-based query tool in a browser.

### Updates

:::note
[SPARQL updates](../config/#sparql-updates) must be enabled in the LSP settings.
:::

Update queries can be either through a browser or other client, like read queries. However, they can also be run directly in the editor with the `⚡️ Apply Update` Code Lens.

The results of the update will appear as unsaved "edits" to the affected files.

## Clients

The Knowboard SPARQL server is compatible with a variety of standard clients.

### Comunica

https://comunica.dev/docs/query/getting_started/query_cli/

```sh
$ npm install -g @comunica/query-sparql
$ comunica-sparql http://localhost:7878/sparql \
  -t table 'SELECT ?s ?p ?o WHERE { ?s ?p ?o }'
```
