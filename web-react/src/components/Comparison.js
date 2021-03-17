import React from 'react'
import FieldImporter from './form-fields/FieldImporter'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { Grid } from '@material-ui/core'
import Visualisation from './Visualisation'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function Comparison(props) {
  const theme = useTheme()

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      position: 'relative',
    },
    gridContainer: {
      margin: 0,
      width: '100%',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }))

  const classes = useStyles(theme)
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <FieldImporter.Button
        text="Open Comparisson"
        color="primary"
        onClick={handleClickOpen}
      />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Household Comparison
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={4} className={classes.gridContainer}>
          <Grid item xs={12} md={12} lg={6}>
            <Visualisation
              household={props.original[0].household}
              title={'Original'}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Visualisation
              household={props.new.household}
              title={'Potential Match'}
            />
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  )
}
