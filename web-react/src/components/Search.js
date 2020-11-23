import React, { useState, useEffect } from 'react'
import { useTheme } from '@material-ui/core/styles'
import {
  FormControl,
  FormLabel,
  Grid,
  Paper,
  RadioGroup,
  TextField,
  Radio,
  FormControlLabel,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Title from './Title'
import clsx from 'clsx'

import SearchResults from './SearchResults'

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
      '& .MuiFormControl-root': {
        width: '80%',
        margin: theme.spacing(1),
      },
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

  const [values, setValues] = useState(initialValues)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  return (
    <React.Fragment>
      {console.log(values)}
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={fixedHeightPaper}>
            <Title>Search</Title>
            <form className={classes.root}>
              <Grid container>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel>Year</FormLabel>
                    <RadioGroup
                      row
                      name="year"
                      value={values.year}
                      onChange={handleInputChange}
                    >
                      <FormControlLabel
                        value="1901"
                        control={<Radio />}
                        label="1901"
                      />
                      <FormControlLabel
                        value="1911"
                        control={<Radio />}
                        label="1911"
                      />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    variant="outlined"
                    label="Surname"
                    name="surname"
                    value={values.surname}
                    onChange={handleInputChange}
                  />
                  <TextField
                    variant="outlined"
                    label="Forename"
                    name="forename"
                    value={values.forename}
                    onChange={handleInputChange}
                  />
                  <FormControl>
                    <FormLabel>Sex</FormLabel>
                    <RadioGroup
                      row
                      name="sex"
                      value={values.sex}
                      onChange={handleInputChange}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="both"
                        control={<Radio />}
                        label="Both"
                      />
                    </RadioGroup>
                  </FormControl>
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
                  <TextField
                    variant="outlined"
                    label="Townland/Street"
                    name="townland"
                    value={values.townland}
                    onChange={handleInputChange}
                  />
                  <TextField
                    variant="outlined"
                    label="DED"
                    name="ded"
                    value={values.ded}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <SearchResults></SearchResults>
    </React.Fragment>
  )
}
