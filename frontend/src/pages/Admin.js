import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { TRAVELR_API } from '../config/keys';
import isAdmin from '../auth/isAdmin';

import { Button, Card, Form } from 'semantic-ui-react'
import { deleteTravelLog, getAllTravelLogs } from '../services/travelLogService';

const Admin = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const history = useHistory();
  const [logs, setLogs] = useState([]);

  const checkForAdmin = async () => {
    const token = await getAccessTokenSilently();
    const admin = await isAdmin(token, user.nickname);
    console.log(admin);
    if (!admin) {
      history.push('/')
    }
  }

  const fetchTravelLogs = async () => {
    const allTravelLogs = await getAllTravelLogs();
    setLogs(allTravelLogs);
  }

  const deleteLog = async (id) => {
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
      <h1>Admin page</h1>
      <h3>All travel logs of every user</h3>
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

export default Admin
