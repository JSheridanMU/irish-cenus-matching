import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Title from './Title'
import { useQuery, gql } from '@apollo/client'
import ResultsTable from './ResultsTable'

const GET_HOUSEHOLD = gql`
  query getHouseholds($year: String, $forename: String) {
    Person(filter: { household_contains: $year, forename: $forename }) {
      id: _id
      forename
      surname
      age
      sex
      relationToHead
      household
      birthplace
      occupation
      religion
      related_to {
        forename
        surname
        age
        sex
        relationToHead
      }
      related_from {
        forename
        surname
        age
        sex
        relationToHead
      }
      RELATED_TO_rel {
        from {
          name
        }
        to {
          name
        }
      }
    }
  }
`

export default function SearchResults(values) {
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
      height: 500,
    },
  }))
  const classes = useStyles(theme)
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  const { loading, data, error } = useQuery(GET_HOUSEHOLD, {
    variables: {
      year: '/' + values.values.year + '/',
      forename: values.values.forename,
    },
  })

  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={fixedHeightPaper}>
            <Title>{values.values.year}</Title>
            <ResultsTable data={data} loading={loading} error={error} />
          </Paper>
        </Grid>
        {/* <Grid item xs={12} md={12} lg={6}>
          <Paper className={fixedHeightPaper}>
            <p>Second Year</p>
          </Paper>
        </Grid> */}
      </Grid>
    </React.Fragment>
  )
}
