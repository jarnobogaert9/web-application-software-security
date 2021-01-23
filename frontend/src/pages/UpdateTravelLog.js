import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'

import { Button, Form } from 'semantic-ui-react'
import isAdmin from '../auth/isAdmin';
import { useHistory, useParams } from 'react-router-dom';
import { getOneTravelLog, updateTravelLog } from '../services/travelLogService';
import { getUser } from '../services/userService';


const CreateTravelLogs = () => {
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [logId, setLogId] = useState('');
  let { id } = useParams();


  const checkForAdmin = async () => {
    const token = await getAccessTokenSilently();
    const { sub } = await getUser({ token });
    const admin = await isAdmin(token, sub);
    console.log(admin);
    // If you are admin you can not create a travel log so we redirect
    if (admin) {
      history.push('/')
    }
  }

  const update = async () => {
    console.log('Update log');
    console.log(title, place, description);
    // Make request to api to create a travel log
    const token = await getAccessTokenSilently();

    const data = {
      title,
      place,
      description
    }
    console.log(data, logId);

    await updateTravelLog({ token, data, id: logId });

    // clearForm();
    return;
  }

  const clearForm = () => {
    setTitle('');
    setPlace('');
    setDescription('');
  }

  const loadTravelLog = async () => {
    console.log('get log:', id);
    const token = await getAccessTokenSilently();
    const { title, place, description, _id } = await getOneTravelLog({ token, id });
    setTitle(title);
    setPlace(place);
    setDescription(description);
    setLogId(_id);
  }

  useEffect(() => {
    checkForAdmin();
    loadTravelLog();
  }, [])
  return (
    <div>
      <h1>Update Travel Log</h1>
      <Form>
        <Form.Field>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter title' />
        </Form.Field>
        <Form.Field>
          <label>Place</label>
          <input value={place} onChange={(e) => setPlace(e.target.value)} placeholder='Enter place ex. Dubai' />
        </Form.Field>
        <Form.TextArea value={description} onChange={(e) => setDescription(e.target.value)} label='Description' placeholder='Tell us more about your travel trip' />
        <Button color="yellow" type='submit' onClick={() => update()}>Update Log</Button>
      </Form>
    </div>
  )
}

export default CreateTravelLogs
