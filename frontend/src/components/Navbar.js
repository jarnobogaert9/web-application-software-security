import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import React from 'react'
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

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

const AuthNav = () => {
  const { isAuthenticated } = useAuth0();
  return (isAuthenticated ? <LogoutButton /> : <LoginButton />)
}

const Navbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>News</Typography>
            <Link to="/">
              <Button>Home</Button>
            </Link>
            <Link to="/profile">
              <Button>Profile</Button>
            </Link>
            <AuthNav />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Navbar
