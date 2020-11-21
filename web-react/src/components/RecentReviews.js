import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useQuery, gql } from '@apollo/client'
import Title from './Title'

const GET_RECENT_REVIEWS_QUERY = gql`
  {
    Person(first: 10, orderBy: household_asc) {
      id: _id
      forename
      surname
      age
      sex
      religion
    }
  }
`

export default function RecentReviews() {
  const { loading, error, data } = useQuery(GET_RECENT_REVIEWS_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <React.Fragment>
      <Title>People</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Forename</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Sex</TableCell>
            <TableCell align="right">Religion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.Person.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.forename}</TableCell>
              <TableCell>{row.surname}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.sex}</TableCell>
              <TableCell align="right">{row.religion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
