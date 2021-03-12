import React, { useState, useEffect } from 'react'
import neo4j from 'neo4j-driver/lib/browser/neo4j-web'
import ForceGraph from './ForceGraph'

export default function Visualisation(props) {
  const { household } = props
  const [nodeData, setNodeData] = useState(null)
  const [linkData, setLinkData] = useState(null)

  const driver = neo4j.driver(
    process.env.REACT_APP_NEO4J_URI,
    neo4j.auth.basic(
      process.env.REACT_APP_NEO4J_USER,
      process.env.REACT_APP_NEO4J_PASSWORD
    ),
    { encrypted: false }
  )

  //TODO refactor with useCallback
  useEffect(() => {
    const session = driver.session()
    session
      .run(
        `
        MATCH (p:Person {
            household:$household
          })
        CALL apoc.path.subgraphAll(p, {relationshipFilter: "RELATED_TO"})
        YIELD nodes, relationships
        RETURN nodes, relationships;
    `,
        {
          household: household,
        }
      )
      .then((result) => {
        setNodeData(result.records[0]._fields[0])
        setLinkData(result.records[0]._fields[1])
      })
  }, [])

  return (
    <React.Fragment>
      {nodeData && linkData ? (
        <ForceGraph nodeData={nodeData} linkData={linkData} />
      ) : null}
    </React.Fragment>
  )
}
