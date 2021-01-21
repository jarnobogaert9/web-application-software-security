import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Card } from 'semantic-ui-react';
import { getAllTravelLogs } from '../services/travelLogService';

const Home = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [logs, setLogs] = useState([]);

  const fetchTravelLogs = async () => {
    const allLogs = await getAllTravelLogs();
    setLogs(allLogs);
  }


  useEffect(() => {
    fetchTravelLogs();
  }, [])

  return (
    <>
      <h1>Homepage</h1>
      {logs.map(log => (
        <Card fluid key={log._id}>
          <Card.Content>
            <Card.Header>{log.title}</Card.Header>
            <Card.Meta>{log.place}</Card.Meta>
            <Card.Description>
              {log.description}
            </Card.Description>
          </Card.Content>
        </Card>
      ))}
    </>
  )
}

export default Home
