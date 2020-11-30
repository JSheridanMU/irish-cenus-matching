import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useQuery, gql } from '@apollo/client'
import Title from './Title'

const GET_PERSON_DATA_QUERY = gql`
  {
    Person(first: 10, orderBy: household_asc) {
      id: _id
      forename
      surname
      age
      sex
      birthplace
      occupation
      religion
      relationToHead
      household
    }
  }
`

export default function PersonData() {
  const { loading, error, data } = useQuery(GET_PERSON_DATA_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <React.Fragment>
      <Title>Data Format</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Sex</TableCell>
            <TableCell>Birthplace</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Religion</TableCell>
            <TableCell>Relation to Head of Family</TableCell>
            <TableCell>Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.Person.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.forename + ' ' + row.surname}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.sex}</TableCell>
              <TableCell>{row.birthplace}</TableCell>
              <TableCell>{row.occupation}</TableCell>
              <TableCell>{row.religion}</TableCell>
              <TableCell>{row.relationToHead}</TableCell>
              <TableCell>
                {row.household.includes('1911') ? '1911' : '1901'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
