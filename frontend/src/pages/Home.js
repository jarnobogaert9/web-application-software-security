import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { TRAVELR_API } from '../config/keys';
import { Button, Card } from 'semantic-ui-react';

const Home = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [logs, setLogs] = useState([]);

  const fetchTravelLogs = async () => {
    // Make api request to get user travel logs
    const response = await fetch(`${TRAVELR_API}/travelLogs`, {
      headers: {
        Accept: 'application/json'
      }
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
    if (response.status === 200) {
      // Show logs on screen
      setLogs(json.data);
    }
  }

  // const fetchHandler = async () => {
  //   try {
  //     const token = await getAccessTokenSilently();
  //     console.log('Token:', token);
  //     const response = await fetch(`http://localhost:4000/authorized`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     const json = await response.json();
  //     console.log(response);
  //     console.log(json);

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }


  useEffect(() => {
    fetchTravelLogs();
  }, [])

  return (
    <div>
      <h1>Homepage</h1>
      {/* <Button color="primary" variant="contained" onClick={fetchHandler}>Click Me!</Button> */}
      {logs.map(log => (
        <>
          <Card fluid key={log._id}>
            <Card.Content>
              <Card.Header>{log.title}</Card.Header>
              <Card.Meta>{log.place}</Card.Meta>
              <Card.Description>
                {log.description}
              </Card.Description>
            </Card.Content>
          </Card>
        </>
      ))}
    </div>
  )
}

export default Home
