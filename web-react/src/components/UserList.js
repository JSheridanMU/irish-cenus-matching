import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { withStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
  TableSortLabel,
  TextField,
} from '@material-ui/core'

import Title from './Title'

const styles = (theme) => ({
  root: {
    maxWidth: 1300,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    margin: 'auto',
  },
  table: {
    minWidth: 700,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 300,
  },
})

const GET_USER = gql`
  query usersPaginateQuery(
    $first: Int
    $offset: Int
    $orderBy: [_PersonOrdering]
    $filter: _PersonFilter
  ) {
    Person(first: $first, offset: $offset, orderBy: $orderBy, filter: $filter) {
      id: _id
      forename
      surname #stars
      age #reviews
    }
  }
`

function UserList(props) {
  const { classes } = props
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('forename')
  const [page] = React.useState(0)
  const [rowsPerPage] = React.useState(50)
  const [filterState, setFilterState] = React.useState({ usernameFilter: '' })

  const getFilter = () => {
    return filterState.usernameFilter.length > 0
      ? { forename_contains: filterState.usernameFilter }
      : {}
  }

  const { loading, data, error } = useQuery(GET_USER, {
    variables: {
      first: rowsPerPage,
      offset: rowsPerPage * page,
      orderBy: orderBy + '_' + order,
      filter: getFilter(),
    },
  })

  const handleSortRequest = (property) => {
    const newOrderBy = property
    let newOrder = 'desc'

    if (orderBy === property && order === 'desc') {
      newOrder = 'asc'
    }

    setOrder(newOrder)
    setOrderBy(newOrderBy)
  }

  const handleFilterChange = (filterName) => (event) => {
    const val = event.target.value

    setFilterState((oldFilterState) => ({
      ...oldFilterState,
      [filterName]: val,
    }))
  }

  return (
    <Paper className={classes.root}>
      <Title>Person List</Title>
      <TextField
        id="search"
        label="Forename Contains"
        className={classes.textField}
        value={filterState.usernameFilter}
        onChange={handleFilterChange('usernameFilter')}
        margin="normal"
        variant="outlined"
        type="text"
        InputProps={{
          className: classes.input,
        }}
      />
      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error</p>}
      {data && !loading && !error && (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell
                key="forename"
                sortDirection={orderBy === 'forename' ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === 'forename'}
                    direction={order}
                    onClick={() => handleSortRequest('forename')}
                  >
                    Forename
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell
                key="surname"
                sortDirection={orderBy === 'surname' ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-end" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === 'surname'}
                    direction={order}
                    onClick={() => handleSortRequest('surname')}
                  >
                    Surname
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell
                key="age"
                sortDirection={orderBy === 'age' ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === 'age'}
                    direction={order}
                    onClick={() => handleSortRequest('age')}
                  >
                    Age
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.Person.map((n) => {
              return (
                <TableRow key={n._id}>
                  <TableCell component="th" scope="row">
                    {n.forename}
                  </TableCell>
                  <TableCell>{n.surname}</TableCell>
                  <TableCell>{n.age}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </Paper>
  )
}

export default withStyles(styles)(UserList)
