# Irish Census Household Matching

This project is a [GRANDstack](https://grandstack.io) (GraphQL, React, Apollo, Neo4j Database) application for matching households in Irish 1901 and 1911 cenus data. There are two components to the application, the web frontend application (React) and the API app (GraphQL server).

## Run the App

### 1. Create A Neo4j Instance

[Neo4j Sandbox](https://neo4j.com/sandbox) allows you to create a free hosted Neo4j instance private to you that can be used for development.

After singing in to Neo4j Sandbox, click the `+ New Project` button and select the "Blank Sandbox" option. In the next step we'll use the connection credentials from the "Connection details" tab to connect our GraphQL API and React app to this Neo4j instance.

![Neo4j Sandbox connection details](img/neo4j-sandbox.png)

`Open with Browser` and run the following query to load 1911 sample data:

```
:auto USING PERIODIC COMMIT 2000
LOAD CSV WITH HEADERS FROM 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQIqIpgi5Nw51CbieLecwqDf1ctvjhQZDPy8GlcgmqHhhYFv_gkbHQrxQH3OU-aBhTHOEMXzBVF_gUH/pub?gid=1824883553&single=true&output=csv' AS row
WITH row WHERE row.Household CONTAINS '1911'
MERGE (p:Person {
	household: coalesce(row.Household, "UNKNOWN"),
    forename: coalesce(row.Forename, "UNKNOWN"),
	surname: coalesce(row.Surname, "UNKNOWN"),
    age: toInteger(coalesce(row.Age, -1)),
    sex: coalesce(row.Sex, "UNKNOWN"),
    birthplace: coalesce(row.Birthplace, "UNKNOWN"),
    occupation: coalesce(row.Occupation, "UNKNOWN"),
    religion: coalesce(row.Religion, "UNKNOWN"),
    relationToHead: coalesce(row.RelationToHead, "UNKNOWN"),
    soundex: coalesce(row.Soundex, "UNKNOWN")
});
```

Run the following query to load 1901 sample data:

```
:auto USING PERIODIC COMMIT 2000
LOAD CSV WITH HEADERS FROM 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQIqIpgi5Nw51CbieLecwqDf1ctvjhQZDPy8GlcgmqHhhYFv_gkbHQrxQH3OU-aBhTHOEMXzBVF_gUH/pub?gid=1824883553&single=true&output=csv' AS row
WITH row WHERE row.Household CONTAINS '1911'
MERGE (p:Person {
	household: coalesce(row.Household, "UNKNOWN"),
    forename: coalesce(row.Forename, "UNKNOWN"),
	surname: coalesce(row.Surname, "UNKNOWN"),
    age: toInteger(coalesce(row.Age, -1)),
    sex: coalesce(row.Sex, "UNKNOWN"),
    birthplace: coalesce(row.Birthplace, "UNKNOWN"),
    occupation: coalesce(row.Occupation, "UNKNOWN"),
    religion: coalesce(row.Religion, "UNKNOWN"),
    relationToHead: coalesce(row.RelationToHead, "UNKNOWN"),
    soundex: coalesce(row.Soundex, "UNKNOWN")
});
```

Finally, run the following query to create relationships

```
MATCH (h:Person),(o:Person)
WHERE (h.household = o.household)
AND (id(h) <> id(o))
AND NOT exists((h)-[:RELATED_TO]-(o))
CREATE (h)-[r:RELATED_TO {
    name: h.soundex+'-'+o.soundex+'-'+abs(h.age-o.age),
    type: h.relationToHead+'/'+o.relationToHead
}]->(o)
RETURN type(r)
```

### 2. Install Dependencies

In the project root directory:

```
npm install
```

or with Yarn

```
yarn install
```

For the React app:

```
cd web-react
```

```
npm install
```

Back to root:

```
cd ..
```

For the GraphQL API:

```
cd api
```

```
npm install
```

Back to root:

```
cd ..
```

### 4. Open In Browser

Update the .env file in the api directory with the connection parameters for your Neo4j instance

```
NEO4J_URI=bolt url here
NEO4J_USER=neo4j
NEO4J_PASSWORD=password here
```

Update the .env file in the web-react directory with the connection parameters for your Neo4j instance

```
REACT_APP_NEO4J_URI=bolt url here
REACT_APP_NEO4J_USER=neo4j
REACT_APP_NEO4J_PASSWORD=password here
```

In the repo's root directory run

```
npm run start
```
