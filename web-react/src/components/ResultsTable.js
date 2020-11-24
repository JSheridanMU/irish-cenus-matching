import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from '@material-ui/core'
import FieldImporter from './form-fields/FieldImporter'

function formatData(data) {
  let people = []
  data.Person.forEach((person) => {
    people.push({
      age: person.age,
      birthplace: person.birthplace,
      forename: person.forename,
      household: person.household,
      occupation: person.occupation,
      relationToHead: person.relationToHead,
      religion: person.religion,
      sex: person.sex,
      surname: person.surname,
      relatives: person.related_to.concat(person.related_from),
      relationships: person.RELATED_TO_rel.from.concat(
        person.RELATED_TO_rel.to
      ),
    })
  })
  return people
}

export default function ResultsTable(props) {
  return (
    <React.Fragment>
      {props.data && !props.loading && !props.error && (
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell key="forename"> Forename</TableCell>
                <TableCell key="surname"> Surname</TableCell>
                <TableCell key="age"> Age</TableCell>
                <TableCell key="sex"> Sex</TableCell>
                <TableCell key="birthplace"> Birthplace</TableCell>
                <TableCell key="occupation"> Occupation</TableCell>
                <TableCell key="religion"> Religion</TableCell>
                <TableCell key="relationToHead"> Relation to Head</TableCell>
                <TableCell key="household"> Household</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formatData(props.data).map((n) => {
                return (
                  <TableRow key={n.id}>
                    <TableCell component="th" scope="row">
                      {n.forename}
                    </TableCell>
                    <TableCell>{n.surname}</TableCell>
                    <TableCell>{n.age}</TableCell>
                    <TableCell>{n.sex}</TableCell>
                    <TableCell>{n.birthplace}</TableCell>
                    <TableCell>{n.occupation}</TableCell>
                    <TableCell>{n.religion}</TableCell>
                    <TableCell>{n.relationToHead}</TableCell>
                    <TableCell>
                      <FieldImporter.Button
                        text="Household"
                        color="primary"
                        onClick={(e) => {
                          e.preventDefault()
                          window.open(n.household, '_blank')
                        }}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </React.Fragment>
  )
}
