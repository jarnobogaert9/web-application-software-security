import React from 'react'
import { Button } from '@material-ui/core'
import { useAuth0 } from '@auth0/auth0-react'

const Home = () => {
  const { getAccessTokenSilently } = useAuth0();
  const fetchHandler = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log('Token:', token);
      const response = await fetch(`http://localhost:4000/authorized`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const json = await response.json();
      console.log(response);
      console.log(json);

    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <h1>Homepage</h1>
      <Button color="primary" variant="contained" onClick={fetchHandler}>Click Me!</Button>
    </div>
  )
}

export default Home
