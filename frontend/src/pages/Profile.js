import { useAuth0 } from '@auth0/auth0-react'
import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import { TRAVELR_API } from '../config/keys';

const Profile = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [downloading, setDownloading] = useState(false);

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
      new Blob([JSON.stringify(json)], {
        type: "application/json",
      })
    );
    let temp = document.createElement("a");
    temp.href = fileURL;
    temp.setAttribute("download", `${user.nickname}.json`);
    temp.click();
    setDownloading(false);
  }

  return (
    <div>
      <h1>Profile</h1>
      <h3>Nickname: {user.nickname}</h3>
      <h3>Email: {user.email}</h3>
      <Button loading={downloading} onClick={() => getPersonalData()}>Download data</Button>
    </div>
  )
}

export default Profile
