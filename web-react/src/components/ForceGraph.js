import React, { useRef } from 'react'
import ForceGraph2D from 'react-force-graph-2d'

const handleNodeClick = (node) => {
  console.log(node)
}

export default function D3(props) {
  const { nodeData, linkData } = props
  const fgRef = useRef(800)
  let firstRender = true

  const nodes = nodeData.map(function (node) {
    node.id = node.identity.low
    node.displayName = node.properties.forename + ' ' + node.properties.surname
    return node
  })

  const links = linkData.map(function (link) {
    link.source = link.end.low
    link.target = link.start.low
    link.displayName = link.properties.name
    return link
  })

  const graphData = {
    nodes: nodes,
    links: links,
  }

  return (
    <React.Fragment>
      {props.nodeData ? (
        <ForceGraph2D
          height={500}
          width={700}
          cooldownTicks={50}
          ref={fgRef}
          onEngineStop={() => {
            if (firstRender) {
              fgRef.current.zoomToFit(800)
              firstRender = false
            }
          }}
          graphData={graphData}
          linkLabel="displayName"
          onNodeClick={handleNodeClick}
          onNodeDragEnd={(node) => {
            node.fx = node.x
            node.fy = node.y
          }}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.displayName
            const fontSize = 12 / globalScale
            ctx.font = `${fontSize}px Sans-Serif`
            const textWidth = ctx.measureText(label).width
            const bckgDimensions = [textWidth, fontSize].map(
              (n) => n + fontSize * 0.2
            )
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
            ctx.fillRect(
              node.x - bckgDimensions[0] / 2,
              node.y - bckgDimensions[1] / 2,
              ...bckgDimensions
            )
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillStyle = 'blue'
            ctx.fillText(label, node.x, node.y)
            node.__bckgDimensions = bckgDimensions
          }}
        />
      ) : null}
    </React.Fragment>
  )
}
