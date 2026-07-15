---
title: Effective Update Queries
---

In SPARQL a typical update query will look something like:

```sparql
DELETE {}
INSERT {}
WHERE {}
```

Instead of `UPDATE`ing a field like in SQL, if you want to replace a value, you can delete it and insert a new one. Though if you only want to `INSERT` or `DELETE` you can just include the clause that you need.

Starting with a document like this, let's build a query to replace `ex:sampleProperty`:

```md
---
"@context":
  ex: http://example.org/
"@type": ex:MyType
ex:sampleProperty: "old value"
---
```

Let's first focus on the `WHERE` clause for a few key things about how Knowboard executes SPARQL queries:

```sparql
PREFIX kb: <https://knowboard.dev/vocab#>
PREFIX ex: <http://example.org/>
DELETE { /* TODO */ }
INSERT { /* TODO */ }
WHERE {
  BIND(<> as ?targetItem)
  GRAPH ?graph {
    ?targetItem a ex:MyType ;
      ex:sampleProperty ?oldValue .
  }
}
```

The `<>` here refers to the IRI of the current subject. By `BIND`ing it as `?targetItem` we assign a name that makes it clearer to refer to it in other parts of the query. Knowboard assigns the `BASE` of the query to the target IRI, and since `<>` is an "empty" relative IRI, it gets the IRI of the target itself.

The `GRAPH` clause is also critical to locate which "named graph" contains the item we want to update. In Knowboard, the `GRAPH` name corresponds to the filename. Updates can span multiple files, but your query will need to specify which `GRAPH`s (files) to update. Here we only need the `GRAPH` of the file containing the target of our update.

Then we bind the existing value as `?oldValue`.

Now, filling in the `DELETE` and `INSERT`, we need to specify the `GRAPH` (file) and data we want to update. We start by deleting the `?oldValue`:

```sparql
DELETE {
  GRAPH ?graph {
    ?targetItem ex:sampleProperty ?oldValue
  }
}
```

Then insert "new value" for `ex:sampleProperty`:

```sparql
INSERT {
  GRAPH ?graph {
    ?targetItem ex:sampleProperty "new value"
  }
}
```

Combining it together, this will all run in a single transaction. Running this query will update the files inside the text editor, but they will not be saved by default. You can review the results, and save the files, or undo the changes.

```sparql
PREFIX kb: <https://knowboard.dev/vocab#>
PREFIX ex: <http://example.org/>
DELETE {
  GRAPH ?graph {
    ?targetItem ex:sampleProperty ?oldValue
  }
}
INSERT {
  GRAPH ?graph {
    ?targetItem ex:sampleProperty "new value"
  }
}
WHERE {
  BIND(<> as ?targetItem)
  GRAPH ?graph {
    ?targetItem a ex:MyType ;
      ex:sampleProperty ?oldValue .
  }
}
```
