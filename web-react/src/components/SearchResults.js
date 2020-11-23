import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

export default function SearchResults() {
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
        <Grid item xs={12} md={12} lg={6}>
          <Paper className={fixedHeightPaper}>
            <p>First Year</p>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Paper className={fixedHeightPaper}>
            <p>Second Year</p>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
