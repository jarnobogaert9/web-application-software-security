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
import CreateTravelLog from './pages/CreateTravelLog';
import UpdateTravelLog from './pages/UpdateTravelLog';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Admin from './pages/Admin';
import EmailCheker from './auth/EmailCheker';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Navbar />
      <Container className="addSpacer">
        <EmailCheker>
          <Route path="/" component={Home} exact />
        </EmailCheker>
        <Route path="/privacy-policy" component={PrivacyPolicy} exact />
        <PrivateRoute path="/travellogs" component={TravelLogs} exact />
        <PrivateRoute path="/travellogs/create" component={CreateTravelLog} exact />
        <PrivateRoute path="/travellogs/update/:id" component={UpdateTravelLog} exact />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/admin" component={Admin} />
      </Container>
      <Footer />
    </>
  );
}

export default App;
