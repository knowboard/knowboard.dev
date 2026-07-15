---
title: Resource Actions
# description:
---

Resource Actions define update queries that will appear as a "Code Lens" for resources with the associated type.

:::note
SPARQL updates must be [enabled in the config](../config/#language-server) to use Resource Actions.
:::

For more details on writing the queries, see the [Effective Update Queries guide](../../guides/updating/).

```turtle
@prefix kb: <https://knowboard.dev/vocab#> .
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

# ActionGroups are an optional way to group multiple actions
# under a single label.
:MyGroup a kb:ActionGroup ;
  rdfs:label "Grouped Actions" .

# Actions are associated with a shape and its type
:MyShape a sh:NodeShape ;
  sh:targetClass :MyType ;

  kb:resourceAction [
    # ModifyAction is the one type of action currently defined
    a kb:ModifyAction ;
    # Actions should have a label to display
    rdfs:label "My Action" ;
    # Optional group association
    kb:actionGroup :MyGroup ;
    # Actions within a group are sorted based on this order
    sh:order 1 ;
    # The SPARQL update query to perform when the action is run.
    # The query BASE will be set to current subject.
    sh:update """
      PREFIX kb: <https://knowboard.dev/vocab#>
      PREFIX ex: <http://example.org/>
      INSERT {
        GRAPH ?graph {
          ?targetItem ex:sampleProperty "sample value"
        }
      }
      WHERE {
        # <> refers to the "current" subject
        BIND(<> as ?targetItem)
        GRAPH ?graph {
          ?targetItem a :MyType ;
            kb:label ?_targetLabel .
        }
      }
    """ ;
  ] ;
```
