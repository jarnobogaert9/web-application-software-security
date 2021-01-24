import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'

import { Button, Form } from 'semantic-ui-react'
import isAdmin from '../auth/isAdmin';
import { useHistory } from 'react-router-dom';
import { createTraveLog } from '../services/travelLogService';
import { getUser } from '../services/userService';

const CreateTravelLogs = () => {
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');


  const checkForAdmin = async () => {
    const token = await getAccessTokenSilently();
    const { sub } = await getUser({ token });
    const admin = await isAdmin(token, sub);
    // If you are admin you can not create a travel log so we redirect
    if (admin) {
      history.push('/')
    }
  }

  const create = async () => {
    // Make request to api to create a travel log
    const token = await getAccessTokenSilently();

    const data = {
      title,
      place,
      description
    }

    const [created, json] = await createTraveLog({ token, data });

    if (!created) {
      return alert(json.msg);
    }

    clearForm();
    return;
  }

  const clearForm = () => {
    setTitle('');
    setPlace('');
    setDescription('');
  }

  useEffect(() => {
    checkForAdmin();
  }, [])
  return (
    <div>
      <h1>Create Travel Log</h1>
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
        <Button color="green" type='submit' onClick={() => create()}>Create Log</Button>
      </Form>
    </div>
  )
}

export default CreateTravelLogs
