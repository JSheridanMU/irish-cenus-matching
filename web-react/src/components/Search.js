import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Title from './Title'
import clsx from 'clsx'

import SearchResults from './SearchResults'
import { UseSearch, Form } from './UseSearch'
import FieldImporter from './form-fields/FieldImporter'
import * as DataService from '../services/DataService'

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
                    items={DataService.getYears()}
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
                    items={DataService.getSexes()}
                  />
                  <FieldImporter.Input
                    label="Age"
                    name="age"
                    value={values.age}
                    onChange={handleInputChange}
                    isNumber={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FieldImporter.Select
                    name="county"
                    label="County"
                    value={values.county}
                    onChange={handleInputChange}
                    options={DataService.getCounties()}
                  />
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
