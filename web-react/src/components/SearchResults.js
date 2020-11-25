import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Title from './Title'
import { useQuery, gql } from '@apollo/client'
import ResultsTable from './ResultsTable'

const GET_HOUSEHOLD = gql`
  query getHouseholds(
    $year: String
    $forename: String
    $surname: String
    $sex: String
    $age_lt: Int
    $age_gt: Int
    $county: String
    $ded: String
    $townland: String
  ) {
    Person(
      filter: {
        AND: [
          { household_contains: $year }
          { household_contains: $county }
          { household_contains: $ded }
          { household_contains: $townland }
        ]
        forename_contains: $forename
        surname_contains: $surname
        sex: $sex
        age_lte: $age_lt
        age_gte: $age_gt
      }
    ) {
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
        id: _id
        forename
        surname
        age
        sex
        relationToHead
        birthplace
        occupation
        religion
      }
      related_from {
        id: _id
        forename
        surname
        age
        sex
        relationToHead
        birthplace
        occupation
        religion
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
      height: 600,
    },
  }))
  const classes = useStyles(theme)
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  const { loading, data, error } = useQuery(GET_HOUSEHOLD, {
    variables: {
      year: '/' + values.values.year + '/',
      ...(values.values.forename !== '' && {
        forename: values.values.forename,
      }),
      ...(values.values.surname !== '' && {
        surname: values.values.surname,
      }),
      ...(values.values.sex !== 'both' && {
        sex: values.values.sex,
      }),
      ...(values.values.age !== '' && {
        age_gt: parseInt(values.values.age) - 5,
        age_lt: parseInt(values.values.age) + 5,
      }),
      ...(values.values.county !== '' && {
        county: '/' + values.values.county + '/',
      }),
      ...(values.values.county !== '' && {
        ded: '/' + values.values.ded + '/',
      }),
      ...(values.values.county !== '' && {
        townland: '/' + values.values.townland + '/',
      }),
    },
  })

  return (
    <React.Fragment>
      {console.log(values.values)}
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
