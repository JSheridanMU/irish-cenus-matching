import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper, Box, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Title from '../Title/Title'
import { useQuery, gql } from '@apollo/client'
import ResultsTable from '../ResultsTable/ResultsTable'
import SecondSearchResults from '../SecondSearchResults/SecondSearchResults'
import { UseSecondSearch } from '../UseSecondSearch'

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
      soundex
      hisco
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
        soundex
        hisco
        RELATED_TO_rel {
          from {
            name
          }
          to {
            name
          }
        }
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
        soundex
        hisco
        RELATED_TO_rel {
          from {
            name
          }
          to {
            name
          }
        }
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

export default function SearchResults(props) {
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
      year: '/' + props.values.year + '/',
      ...(props.values.forename !== '' && {
        forename: props.values.forename,
      }),
      ...(props.values.surname !== '' && {
        surname: props.values.surname,
      }),
      ...(props.values.sex !== 'both' && {
        sex: props.values.sex,
      }),
      ...(props.values.age !== '' && {
        age_gt: parseInt(props.values.year) - parseInt(props.values.age) - 5,
        age_lt: parseInt(props.values.year) - parseInt(props.values.age) + 5,
      }),
      ...(props.values.county !== '' && {
        county: '/' + props.values.county + '/',
      }),
      ...(props.values.county !== '' && {
        ded: '/' + props.values.ded + '/',
      }),
      ...(props.values.county !== '' && {
        townland: '/' + props.values.townland + '/',
      }),
    },
  })

  const { secondSearch, handleSearchTrigger } = UseSecondSearch()

  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={fixedHeightPaper}>
            <Title>{props.values.year}</Title>
            {!data && loading && !error && (
              <Box m="auto" data-testid={'search rendered'}>
                <CircularProgress />
              </Box>
            )}
            <ResultsTable
              data={data}
              loading={loading}
              error={error}
              firstSearch={!secondSearch}
              searchTrigger={handleSearchTrigger}
            />
          </Paper>
        </Grid>
        {secondSearch ? (
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={fixedHeightPaper}>
              <Title>{props.values.year === '1901' ? '1911' : '1901'}</Title>
              <SecondSearchResults
                values={props.values}
                relationships={secondSearch.relationships}
                family={secondSearch.family}
              />
            </Paper>
          </Grid>
        ) : null}
      </Grid>
    </React.Fragment>
  )
}
