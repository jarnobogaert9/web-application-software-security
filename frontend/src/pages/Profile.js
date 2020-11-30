import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

const Profile = () => {
  const { user } = useAuth0();
  console.log(user);
  return (
    <div>
      <h1>Profile</h1>
      {JSON.stringify(user)}
    </div>
  )
}

export default Profile
