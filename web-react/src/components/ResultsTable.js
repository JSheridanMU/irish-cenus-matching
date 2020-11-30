import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  IconButton,
  Box,
  Collapse,
  CircularProgress,
} from '@material-ui/core'
import FieldImporter from './form-fields/FieldImporter'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

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
      id: person.id,
    })
  })
  return people
}

function Row(props) {
  const { row, firstSearch, searchTrigger } = props
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow>
        <TableCell component="th" scope="row">
          {row.forename}
        </TableCell>
        <TableCell>{row.surname}</TableCell>
        <TableCell>{row.age}</TableCell>
        <TableCell>{row.sex}</TableCell>
        <TableCell>{row.birthplace}</TableCell>
        <TableCell>{row.occupation}</TableCell>
        <TableCell>{row.religion}</TableCell>
        <TableCell>{row.relationToHead}</TableCell>
        <TableCell>
          <FieldImporter.Button
            text="Household"
            color="primary"
            onClick={(e) => {
              e.preventDefault()
              window.open(row.household, '_blank')
            }}
          />
        </TableCell>
        <TableCell>
          {!row.relatives.length ? null : (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Forename</TableCell>
                    <TableCell>Surname</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Sex</TableCell>
                    <TableCell>Birthplace</TableCell>
                    <TableCell>Occupation</TableCell>
                    <TableCell>Religion</TableCell>
                    <TableCell>Relation to Head</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.relatives.map((relative) => (
                    <TableRow key={relative.id}>
                      <TableCell component="th" scope="row">
                        {relative.forename}
                      </TableCell>
                      <TableCell>{relative.surname}</TableCell>
                      <TableCell>{relative.age}</TableCell>
                      <TableCell>{relative.sex}</TableCell>
                      <TableCell>{relative.birthplace}</TableCell>
                      <TableCell>{relative.occupation}</TableCell>
                      <TableCell>{relative.religion}</TableCell>
                      <TableCell>{relative.relationToHead}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {firstSearch ? (
                <FieldImporter.Button
                  text={
                    row.household.includes('1911')
                      ? 'Search 1901'
                      : 'Search 1911'
                  }
                  color="primary"
                  onClick={searchTrigger}
                />
              ) : null}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function ResultsTable(props) {
  return (
    <React.Fragment>
      {!props.data && props.loading && !props.error && (
        <Box m="auto">
          <CircularProgress />
        </Box>
      )}
      {props.data && !props.loading && !props.error && (
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Forename</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Sex</TableCell>
                <TableCell>Birthplace</TableCell>
                <TableCell>Occupation</TableCell>
                <TableCell>Religion</TableCell>
                <TableCell>Relation to Head</TableCell>
                <TableCell>Household</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {formatData(props.data).map((row) => (
                <Row
                  key={row.id}
                  row={row}
                  firstSearch={props.firstSearch}
                  searchTrigger={props.searchTrigger}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </React.Fragment>
  )
}
