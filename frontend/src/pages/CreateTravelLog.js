import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'
import { TRAVELR_API } from '../config/keys';

import { Button, Form } from 'semantic-ui-react'

const CreateTravelLogs = () => {
  const { user, getAccessTokenSilently } = useAuth0();

  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');

  const fetchTravelLogs = async () => {
    // Make api request to get user travel logs
    const token = await getAccessTokenSilently();

    const response = await fetch(`${TRAVELR_API}/travelLogs`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
  }

  const createTraveLog = async () => {
    console.log('Create log');
    console.log(title, place, description);
    // Make request to api to create a travel log
    const token = await getAccessTokenSilently();

    const data = {
      title,
      place,
      description
    }

    const response = await fetch(`${TRAVELR_API}/travelLogs`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data)
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
    clearForm();
  }

  const clearForm = () => {
    setTitle('');
    setPlace('');
    setDescription('');
  }

  useEffect(() => {
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
        <Button type='submit' onClick={() => createTraveLog()}>Create Log</Button>
      </Form>
    </div>
  )
}

export default CreateTravelLogs
