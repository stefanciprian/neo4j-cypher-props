const wasm = require("../pkg/neo4j_cypher_props");

describe("index", () => {
  it("should be equal to something", () => {
    const result = wasm.greet("World");

    expect(result).toEqual("Hello, World!");
  });

  it("should modify a cypher query with userId in a node", async () => {
    const cypherQuery =
      'CREATE (n:Person { name: "John" }) RETURN n.name AS name';
    const userId = "1234";

    const response = wasm.modify_cypher_query2(cypherQuery, userId);

    expect(response).toEqual(
      "CREATE (n:Person {userId: '1234', name: \"John\" }) RETURN n.name AS name"
    );
  });

  it("should modify a cypher query with userId in node and in a relationship", async () => {
    const cypherQuery =
      'CREATE (n:Person { name: "John" })-[r:KNOWS]->(m:Person { name: "Jane" }) RETURN n.name AS name';
    const userId = "1234";

    const response = wasm.modify_cypher_query2(cypherQuery, userId);

    expect(response).toEqual(
      "CREATE (n:Person {userId: '1234', name: \"John\" })-[r:KNOWS {userId: '1234'}]->(m:Person {userId: '1234', name: \"Jane\" }) RETURN n.name AS name"
    );
  });

  it("should modify a cypher query with userId in a node and in a relationship only ", async () => {
    const dummyCypherQuery = [
      {
        cq1: `MATCH (u:User {id: $userId}), (m:Movie {title:"Top Gun"})
      MERGE (u)-[:WATCHED]->(m)
      RETURN distinct {answer: 'noted'} AS result`,
      },

      {
        cq2: `MATCH (u:User {id: $userId}), (m:Movie {title:"Top Gun"})
      MERGE (u)-[:LIKE_MOVIE]->(m)
      RETURN distinct {answer: 'noted'} AS result`,
      },
      {
        cq3: `MATCH (u:User {id:$userId}), (m:Movie)-[:IN_GENRE]->(:Genre {name:"Comedy"})
    WHERE NOT EXISTS {(u)-[:WATCHED]->(m)}
    RETURN {movie: m.title} AS result
    ORDER BY m.imdbRating DESC LIMIT 1`,
      },
      {
        cq4: `MATCH (m:Movie)<-[r:ACTED_IN]-(a)
    RETURN {actor: a.name, role: r.role} AS result`,
      },
      {
        cq5: `MATCH (m:Movie {title: "Copycat"})
    RETURN {plot: m.plot} AS result`,
      },
      {
        cq6: `MATCH (p:Person {name:"Luis Guzmán"})-[r:ACTED_IN]->(movie)
    RETURN {movie: movie.title, role: r.role} AS result`,
      },
      {
        cq7: `MATCH (m:Movie)
    WHERE toLower(m.title) CONTAINS toLower("matrix")
    RETURN {movie:m.title} AS result`,
      },
      {
        cq8: `MATCH (u:User {id: $userId})-[:LIKE_MOVIE]->(m:Movie)
    RETURN {movie:m.title} AS result`,
      },
      {
        cq9: `MATCH (u:User {id: $userId})-[:LIKE_MOVIE]->(m:Movie)
    MATCH (m)<-[r1:RATED]-()-[r2:RATED]->(otherMovie)
    WHERE r1.rating > 3 AND r2.rating > 3 AND NOT EXISTS {(u)-[:WATCHED|LIKE_MOVIE|DISLIKE_MOVIE]->(otherMovie)}
    WITH otherMovie, count(*) AS count
    ORDER BY count DESC
    LIMIT 1
    RETURN {recommended_movie:otherMovie.title} AS result`,
      },
    ];

    const expectedCypherQuery = [
      {
        cq1: `MATCH (u:User {userId: '1234'}), (m:Movie {title:"Top Gun"})
      MERGE (u)-[:WATCHED {userId: '1234'}]->(m)
      RETURN distinct {answer: 'noted'} AS result`,
      },

      {
        cq2: `MATCH (u:User {userId: '1234'}), (m:Movie {title:"Top Gun"})
      MERGE (u)-[:LIKE_MOVIE {userId: '1234'}]->(m)
      RETURN distinct {answer: 'noted'} AS result`,
      },
      {
        cq3: `MATCH (u:User {userId: '1234'}), (m:Movie)-[:IN_GENRE]->(:Genre {name:"Comedy"})
    WHERE NOT EXISTS {(u)-[:WATCHED]->(m)}
    RETURN {movie: m.title} AS result
    ORDER BY m.imdbRating DESC LIMIT 1`,
      },
      {
        cq4: `MATCH (m:Movie)<-[r:ACTED_IN]-(a)
    RETURN {actor: a.name, role: r.role} AS result`,
      },
      {
        cq5: `MATCH (m:Movie {title: "Copycat"})
    RETURN {plot: m.plot} AS result`,
      },
      {
        cq6: `MATCH (p:Person {name:"Luis Guzmán"})-[r:ACTED_IN]->(movie)
    RETURN {movie: movie.title, role: r.role} AS result`,
      },
      {
        cq7: `MATCH (m:Movie)
    WHERE toLower(m.title) CONTAINS toLower("matrix") 
    RETURN {movie:m.title} AS result`,
      },
      {
        cq8: `MATCH (u:User {userId: '1234'})-[:LIKE_MOVIE]->(m:Movie)
    RETURN {movie:m.title} AS result`,
      },
      {
        cq9: `MATCH (u:User {userId: '1234'})-[:LIKE_MOVIE]->(m:Movie)
    MATCH (m)<-[r1:RATED]-()-[r2:RATED]->(otherMovie)
    WHERE r1.rating > 3 AND r2.rating > 3 AND NOT EXISTS {(u)-[:WATCHED|LIKE_MOVIE|DISLIKE_MOVIE]->(otherMovie)}
    WITH otherMovie, count(*) AS count
    ORDER BY count DESC
    LIMIT 1
    RETURN {recommended_movie:otherMovie.title} AS result`,
      },
    ];

    const userId = "1234";

    for (let i = 0; i < dummyCypherQuery.length; i++) {
      const response = wasm.modify_cypher_query(
        Object.values(dummyCypherQuery[i])[0],
        userId
      );
      expect(response).toEqual(Object.values(expectedCypherQuery[i])[0]);
    }
  });
});
