import React, { useState, useEffect } from 'react'
import neo4j from 'neo4j-driver/lib/browser/neo4j-web'
import ForceGraphDisplay from '../ForceGraphDisplay/ForceGraphDisplay'
import { MatchPerson } from '../MatchPerson'

export default function Visualisation(props) {
  const { household, comparison, title } = props
  const [nodeData, setNodeData] = useState(null)
  const [linkData, setLinkData] = useState(null)
  const { match } = MatchPerson()

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
        const nodes = result.records[0]._fields[0]
        const links = result.records[0]._fields[1]

        nodes.forEach((node) => {
          let bestMatch = 0
          comparison.forEach((person) => {
            let matchScore = match(node.properties, person)
            if (matchScore > bestMatch && matchScore > 4.8) {
              bestMatch = matchScore
            }
          })
          if (bestMatch >= 4.8) {
            node.colour = 'green'
          } else {
            node.colour = 'red'
          }
        })

        setNodeData(nodes)
        setLinkData(links)
      })
  }, [])

  return (
    <React.Fragment>
      {nodeData && linkData ? (
        <ForceGraphDisplay
          nodeData={nodeData}
          linkData={linkData}
          title={title}
        />
      ) : null}
    </React.Fragment>
  )
}
