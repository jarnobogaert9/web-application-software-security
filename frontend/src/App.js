import logo from './logo.svg';
import './App.css';

import { Route } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { useAuth0 } from '@auth0/auth0-react';
import { Loading } from './components/Loading';
import { PrivateRoute } from './components/PrivateRoute';
import Profile from './pages/Profile';
import TravelLogs from './pages/TravelLogs';

import { Container } from 'semantic-ui-react'
import CreateTravelLogs from './pages/CreateTravelLog';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Navbar />
      <Container className="addSpacer">
        <Route path="/" component={Home} exact />
        <Route path="/privacy-policy" component={PrivacyPolicy} exact />
        <PrivateRoute path="/travel-logs" component={TravelLogs} />
        <PrivateRoute path="/create-travel-logs" component={CreateTravelLogs} />
        <PrivateRoute path="/profile" component={Profile} />
      </Container>
      <Footer />
    </>
  );
}

export default App;
