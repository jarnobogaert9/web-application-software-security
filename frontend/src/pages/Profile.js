import { useAuth0 } from '@auth0/auth0-react'
import React, { useState, useEffect } from 'react'
import { Button, Divider, Form } from 'semantic-ui-react'
import { TRAVELR_API } from '../config/keys';
import { deleteUserAccount, getUser, updateUserAccount } from '../services/userService';

const Profile = () => {
  const { user, getAccessTokenSilently, logout } = useAuth0();
  const [downloading, setDownloading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [newNickname, setNewNickname] = useState('');

  const getPersonalData = async () => {
    setDownloading(true);
    const token = await getAccessTokenSilently();

    const response = await fetch(`${TRAVELR_API}/users/${user.nickname}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response);
    const json = await response.json();
    console.log(json);

    let fileURL = window.URL.createObjectURL(
      new Blob([JSON.stringify(json.data)], {
        type: "application/json",
      })
    );
    let temp = document.createElement("a");
    temp.href = fileURL;
    temp.setAttribute("download", `${user.nickname}.json`);
    temp.click();
    setDownloading(false);
  }

  const deleteAccount = async () => {
    setDeleting(true);

    const token = await getAccessTokenSilently();

    if (window.confirm('Are you sure you want to delete your account?')) {
      console.log('Delete it');
      // Get sub of the user that is authenticated
      const { sub } = await getUser({ token });
      // Delete user account based on token (wich is of the logged in user in this case)
      const result = await deleteUserAccount({ token, sub });
      if (result.deleted) {
        logout();
      } else {
        alert(result.msg);
      }
    } else {
      console.log('Don\'t delete');
    }
    setDeleting(false);
  }

  const updateAccount = async () => {
    setUpdating(true);

    const token = await getAccessTokenSilently();

    console.log(newNickname);

    const result = await updateUserAccount({ token, nickname: user.nickname, newNickname });

    if (result.updated) {
      // Update tokens in localStorage
      await getAccessTokenSilently({
        ignoreCache: false,
      });
      alert(result.msg);
    } else {
      alert(result.msg);
    }

    setUpdating(false);
  }

  useEffect(() => {
    setNewNickname(user.nickname);
  }, [])

  return (
    <div>
      <h1>Profile</h1>
      <h3>Email: {user.email}</h3>
      <h3>Nickname
        <Form>
          <Form.Input onChange={(e) => setNewNickname(e.target.value)} value={newNickname} placeholder='Enter new nickname' />
        </Form>
      </h3>
      <Button color="blue" loading={updating} onClick={() => updateAccount()}>Update info</Button>
      <br /><br />
      <Divider />
      <br />
      <p>
        <Button loading={downloading} onClick={() => getPersonalData()}>Download data</Button>
      </p>
      <p>
        <Button color="red" loading={deleting} onClick={() => deleteAccount()}>Delete account</Button>
      </p>
    </div>
  )
}

export default Profile
