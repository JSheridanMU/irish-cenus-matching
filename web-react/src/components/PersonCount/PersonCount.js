import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from '../Title/Title'
import { useQuery, gql } from '@apollo/client'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  navLink: {
    textDecoration: 'none',
  },
})

const GET_COUNT_QUERY = gql`
  query getData($year: String) {
    personCount(year: $year)
    houseCount(year: $year)
  }
`

export default function Deposits(props) {
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_COUNT_QUERY, {
    variables: {
      year: '/' + props.year + '/',
    },
  })
  if (error) return <p>Error</p>
  return (
    <React.Fragment>
      <Title>{props.year}</Title>
      <Typography component="p" variant="h4">
        {loading ? 'Loading...' : data.personCount}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        people found in
      </Typography>
      <Typography component="p" variant="h4">
        {loading ? 'Loading...' : data.houseCount}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        households
      </Typography>
    </React.Fragment>
  )
}
