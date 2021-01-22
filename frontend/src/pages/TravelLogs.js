import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'
import { TRAVELR_API } from '../config/keys';

import { Card, Button } from 'semantic-ui-react'
import { getOwnTravelLogs, deleteTravelLog } from '../services/travelLogService';
import isAdmin from '../auth/isAdmin';
import { useHistory } from 'react-router-dom';
import { getUser } from '../services/userService';

const TravelLogs = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const history = useHistory();

  const [logs, setLogs] = useState([]);

  const checkForAdmin = async () => {
    const token = await getAccessTokenSilently();
    const { sub } = await getUser({ token });
    const admin = await isAdmin(token, sub);
    console.log(admin);
    // If you are admin you can not create a travel log so you can not see your own travel logs as a result we redirect
    if (admin) {
      history.push('/')
    }
  }

  const fetchTravelLogs = async () => {
    const token = await getAccessTokenSilently();
    try {
      const ownLogs = await getOwnTravelLogs({ token })
      setLogs(ownLogs);
    } catch (err) {
      console.log(err);
    }

  }

  const deleteLog = async (id) => {
    console.log(id);
    const token = await getAccessTokenSilently();
    await deleteTravelLog({ token, id });
    fetchTravelLogs();
  }

  useEffect(() => {
    checkForAdmin();
    fetchTravelLogs();
  }, [])
  return (
    <>
      <h1>Travel Logs</h1>
      {logs.map(log => (
        <Card fluid key={log._id}>
          <Card.Content>
            <Card.Header>{log.title}</Card.Header>
            <Card.Meta>{log.place}</Card.Meta>
            <Card.Description>
              {log.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button basic color='red' onClick={() => deleteLog(log._id)}>Delete</Button>
          </Card.Content>
        </Card>
      ))}
    </>
  )
}

export default TravelLogs
