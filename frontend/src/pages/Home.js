import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Card, Dimmer, Loader, Segment } from 'semantic-ui-react';
import { getAllTravelLogs } from '../services/travelLogService';

const Home = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [logs, setLogs] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchTravelLogs = async () => {
    const allLogs = await getAllTravelLogs();
    setLogs(allLogs);
    setDataFetched(true);
  }


  useEffect(() => {
    fetchTravelLogs();
  }, [])

  return (
    <>
      <h1>What is <b>Travelr</b> ?</h1>
      <p>Travelr is a platform where you can share your traveling experiences, so called "Travel Logs".</p>
      <h1>All Travel Logs</h1>
      {
        !dataFetched ?
          <Loader active={true} />
          :
          logs.map(log => (
            <Card fluid key={log._id}>
              <Card.Content>
                <Card.Header>{log.title}</Card.Header>
                <Card.Meta>{log.place}</Card.Meta>
                <Card.Description>
                  {log.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Card.Meta>Created by: {log.owner.nickname}</Card.Meta>
              </Card.Content>
            </Card>
          ))
      }
    </>
  )
}

export default Home
