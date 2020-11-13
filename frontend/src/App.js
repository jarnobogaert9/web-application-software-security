import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { Container } from '@material-ui/core';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Container>
          <Route path="/" component={Home} />
        </Container>
      </Router>
    </>
  );
}

export default App;
