import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import isAdmin from '../auth/isAdmin';

import { Button, Card, Form, Grid, Loader } from 'semantic-ui-react'
import { deleteTravelLog, getAllTravelLogs } from '../services/travelLogService';
import { deleteUserAccount, getAllUserAccounts, getUser } from '../services/userService';

const Admin = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const history = useHistory();
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [logDataFetched, setLogDataFetched] = useState(false);
  const [userDataFetched, setUserDataFetched] = useState(false);


  const checkForAdmin = async () => {
    const token = await getAccessTokenSilently();
    const { sub } = await getUser({ token });
    const admin = await isAdmin(token, sub);
    console.log(admin);
    if (!admin) {
      history.push('/')
    }
  }

  const fetchTravelLogs = async () => {
    const allTravelLogs = await getAllTravelLogs();
    setLogs(allTravelLogs);
    setLogDataFetched(true);
  }

  const fetchUsers = async () => {
    const allUsers = await getAllUserAccounts();
    setUsers(allUsers);
    setUserDataFetched(true);
  }

  const deleteLog = async (id) => {
    const token = await getAccessTokenSilently();
    await deleteTravelLog({ token, id });
    fetchTravelLogs();
  }

  const deleteUser = async (sub) => {
    console.log('delete:', sub);
    const token = await getAccessTokenSilently();
    await deleteUserAccount({ token, sub });
    fetchUsers();
  }

  useEffect(() => {
    checkForAdmin();
    fetchTravelLogs();
    fetchUsers();
  }, [])

  return (
    <>
      <h1>Admin page</h1>
      <Grid columns={2} divided>
        {
          !logDataFetched || !userDataFetched ?
            <Loader active={true} />
            :
            <Grid.Row>
              <Grid.Column>
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
                      <p>Created by: {log.owner.nickname}</p>
                      <Button basic color='red' onClick={() => deleteLog(log._id)}>Delete</Button>
                    </Card.Content>
                  </Card>
                ))}
              </Grid.Column>
              <Grid.Column>
                <h3>All users</h3>

                {users.map(user => (
                  <Card fluid key={user.user_id}>
                    <Card.Content>
                      <Card.Header>{user.nickname}</Card.Header>
                      <Card.Meta>sub: {user.user_id}</Card.Meta>
                      <Card.Description>
                        {user.email}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Button basic color='red' onClick={() => deleteUser(user.user_id)}>Delete</Button>
                    </Card.Content>
                  </Card>
                ))}
              </Grid.Column>
            </Grid.Row>
        }
      </Grid>

    </>
  )
}

export default Admin
