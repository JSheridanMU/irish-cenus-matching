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
import { Grid, Paper } from '@material-ui/core'
import Title from './Title'
import clsx from 'clsx'
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
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 600,
    },
  }))

  const classes = useStyles(theme)
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={12} lg={6}>
            <Paper className={fixedHeightPaper}>
              <Title>Original</Title>
              <Visualisation household={props.original[0].household} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Paper className={fixedHeightPaper}>
              <Title>Potential Match</Title>
              <Visualisation household={props.new.household} />
            </Paper>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  )
}
