import React, { useState, useEffect } from 'react'
import { Card, Loader } from 'semantic-ui-react';
import { getAllTravelLogs } from '../services/travelLogService';
import queryString from 'query-string';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const [logs, setLogs] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [checking, setChecking] = useState(true);

  const { logout } = useAuth0();

  const fetchTravelLogs = async () => {
    const allLogs = await getAllTravelLogs();
    setLogs(allLogs);
    setDataFetched(true);
  }


  useEffect(() => {
    const { error_description } = queryString.parse(window.location.search);
    if (error_description) {
      setErrorMsg(error_description);
      setTimeout(() => {
        logout();
      }, 2000);
    } else {
      setErrorMsg(false);
    }
    setChecking(false);
    fetchTravelLogs();
  }, [window.location.href])

  return (
    <>
      {checking &&
        <Loader active={true} />
      }
      {
        !checking &&
        <>
          {errorMsg &&
            <h2>{errorMsg}</h2>
          }
          {!errorMsg &&
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
          }
        </>
      }
    </>
  )
}

export default Home
