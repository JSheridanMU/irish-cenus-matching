import React, { useState, useEffect } from 'react'
import { useTheme } from '@material-ui/core/styles'
import {
  FormControl,
  Grid,
  Paper,
  TextField,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Title from './Title'
import clsx from 'clsx'

import SearchResults from './SearchResults'
import { UseSearch, Form } from './UseSearch'
import FieldImporter from './form-fields/FieldImporter'

const initialValues = {
  year: '1901',
  forename: '',
  surname: '',
  county: '',
  townland: '',
  ded: '',
  age: '',
  sex: 'both',
}

const sexValues = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
  { id: 'both', title: 'Both' },
]

const yearValues = [
  { id: '1901', title: '1901' },
  { id: '1911', title: '1911' },
]

export default function Search() {
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
      height: 450,
    },
  }))
  const classes = useStyles(theme)
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  const { values, handleInputChange } = UseSearch(initialValues)

  return (
    <React.Fragment>
      {console.log(values)}
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={fixedHeightPaper}>
            <Title>Search</Title>
            <Form>
              <Grid container>
                <Grid item xs={6}>
                  <FieldImporter.RadioGroup
                    label="Year"
                    name="year"
                    value={values.year}
                    onChange={handleInputChange}
                    items={yearValues}
                  />
                  <FieldImporter.Input
                    name="surname"
                    label="Surname"
                    value={values.surname}
                    onChange={handleInputChange}
                  />
                  <FieldImporter.Input
                    label="Forename"
                    name="forename"
                    value={values.forename}
                    onChange={handleInputChange}
                  />
                  <FieldImporter.RadioGroup
                    label="Sex"
                    name="sex"
                    value={values.sex}
                    onChange={handleInputChange}
                    items={sexValues}
                  />
                  <TextField
                    variant="outlined"
                    label="Age"
                    name="age"
                    type="number"
                    value={values.age}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="outlined">
                    <InputLabel>County</InputLabel>
                    <Select
                      value={values.county}
                      onChange={handleInputChange}
                      label="County"
                      name="county"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={'Carlow'}>Carlow</MenuItem>
                      <MenuItem value={'Dublin'}>Dublin</MenuItem>
                      <MenuItem value={'Wexford'}>Wexford</MenuItem>
                    </Select>
                  </FormControl>
                  <FieldImporter.Input
                    label="Townland/Street"
                    name="townland"
                    value={values.townland}
                    onChange={handleInputChange}
                  />
                  <FieldImporter.Input
                    label="DED"
                    name="ded"
                    value={values.ded}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Form>
          </Paper>
        </Grid>
      </Grid>
      <SearchResults></SearchResults>
    </React.Fragment>
  )
}
