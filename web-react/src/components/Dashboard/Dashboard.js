import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import PersonCount from '../PersonCount/PersonCount'
import PersonData from '../PersonData/PersonData'
export default function Dashboard() {
  const theme = useTheme()

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
    fixedHeight: {
      height: 240,
    },
  }))
  const classes = useStyles(theme)
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <React.Fragment>
      <Grid container spacing={4}>
        {/* Person Counts */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <PersonCount year="1901" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <PersonCount year="1911" />
          </Paper>
        </Grid>
        {/* Person Format */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <PersonData />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
