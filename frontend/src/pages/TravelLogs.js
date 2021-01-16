import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'
import { TRAVELR_API } from '../config/keys';

import { Card, Button } from 'semantic-ui-react'

const TravelLogs = () => {
  const { user, getAccessTokenSilently } = useAuth0();

  const [logs, setLogs] = useState([]);

  const fetchTravelLogs = async () => {
    // Make api request to get user travel logs
    const token = await getAccessTokenSilently();

    const response = await fetch(`${TRAVELR_API}/travelLogs/own`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

  const deleteTravelLog = async (id) => {
    console.log(id);
    const token = await getAccessTokenSilently();

    const response = await fetch(`${TRAVELR_API}/travelLogs/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
    if (response.status === 200) {
      // Show logs on screen
      console.log('reload logs');
      fetchTravelLogs();
    }
  }

  useEffect(() => {
    fetchTravelLogs();
  }, [])
  return (
    <div>
      <h1>Travel Logs</h1>
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
            <Card.Content extra>
              {/* <Button basic color='blue'>Edit</Button> */}
              <Button basic color='red' onClick={() => deleteTravelLog(log._id)}>Delete</Button>
            </Card.Content>
          </Card>
        </>
      ))}
    </div>
  )
}

export default TravelLogs
