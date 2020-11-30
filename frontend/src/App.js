import logo from './logo.svg';
import './App.css';

import { Route } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { Container } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { Loading } from './components/Loading';
import { PrivateRoute } from './components/PrivateRoute';
import Profile from './pages/Profile';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Navbar />
      <Container>
        <Route path="/" component={Home} exact />
        <PrivateRoute path="/profile" component={Profile} />
      </Container>
    </>
  );
}

export default App;
