# Neo4j Cypher Props

## Using the Package

You can install your package in any Node.js project using npm:

```bash
npm install neo4j-cypher-props
```

And use the Rust functions in your JavaScript code:

```javascript
import {greet, modify_cypher_query2} from 'neo4j-cypher-props';

describe("index", () => {
  it("should be equal to something", () => {
    const result = greet("World");

    expect(result).toEqual("Hello, World!");
  });

  it("should modify a cypher query with userId in a node", async () => {
    const cypherQuery =
      'CREATE (n:Person { name: "John" }) RETURN n.name AS name';
    const userId = "1234";

    const response = modify_cypher_query2(cypherQuery, userId);

    expect(response).toEqual(
      "CREATE (n:Person {userId: '1234', name: \"John\" }) RETURN n.name AS name"
    );
  });
```

This is a basic example to get started. I will add soon more complex interactions between Rust and JavaScript for Neo4j Cypher queries.
