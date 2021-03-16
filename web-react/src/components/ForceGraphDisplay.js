import React, { useState } from 'react'
import ForceGraph from './ForceGraph'
import { Paper, Grid } from '@material-ui/core'
import Title from './Title'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'

export default function ForceGraphDisplay(props) {
  const { nodeData, linkData, title } = props
  const [person, setPerson] = useState(nodeData[0].properties)

  const handleNodeClick = (node) => {
    setPerson(node.properties)
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    graphHeight: {
      height: 450,
    },
    textHeight: {
      height: 150,
    },
  }))

  const theme = useTheme()
  const classes = useStyles(theme)
  const graphHeightPaper = clsx(classes.paper, classes.graphHeight)
  const textHeightPaper = clsx(classes.paper, classes.textHeight)

  return (
    <React.Fragment>
      {props.nodeData ? (
        <Grid container spacing={4}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={graphHeightPaper}>
              <Title>{title}</Title>
              <ForceGraph
                nodeData={nodeData}
                linkData={linkData}
                handleNodeClick={handleNodeClick}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={textHeightPaper}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom>
                    Forename: {person.forename}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Surname: {person.surname}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Estimated Year of Birth: {person.age.low}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Sex: {person.sex}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" gutterBottom>
                    Birthplace: {person.birthplace}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Occupation: {person.occupation}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Religion: {person.religion}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Relation to Head: {person.relationToHead}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      ) : null}
    </React.Fragment>
  )
}
