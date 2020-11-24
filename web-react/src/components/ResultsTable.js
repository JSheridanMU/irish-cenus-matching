import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import FieldImporter from './form-fields/FieldImporter'

export default function ResultsTable(props) {
  return (
    <React.Fragment>
      {console.log(props.data)}
      {props.data && !props.loading && !props.error && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key="forename"> Forename</TableCell>
              <TableCell key="surname"> Surname</TableCell>
              <TableCell key="age"> Age</TableCell>
              <TableCell key="sex"> Sex</TableCell>
              <TableCell key="birthplace"> Birthplace</TableCell>
              <TableCell key="occupation"> Occupation</TableCell>
              <TableCell key="religion"> Religion</TableCell>
              <TableCell key="relationToHead">
                {' '}
                Relation to Head of Family
              </TableCell>
              <TableCell key="household"> Household</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.Person.map((n) => {
              return (
                <TableRow key={n._id}>
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
      )}
    </React.Fragment>
  )
}
