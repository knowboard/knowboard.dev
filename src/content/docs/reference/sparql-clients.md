---
title: SPARQL clients
---

The Knowboard SPARQL server is compatible with a variety of standard clients.

## Comunica

https://comunica.dev/docs/query/getting_started/query_cli/

```
$ npm install -g @comunica/query-sparql
$ comunica-sparql http://localhost:17878/sparql \
  -t table 'SELECT ?s ?p ?o WHERE { ?s ?p ?o }'
```
