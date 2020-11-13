import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>News</Typography>
            <Button variant="contained" color="secondary">Login</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Navbar
