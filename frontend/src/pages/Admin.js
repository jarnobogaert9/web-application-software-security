import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { TRAVELR_API } from '../config/keys';
import isAdmin from '../auth/isAdmin';

import { Button, Form } from 'semantic-ui-react'

const Admin = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const history = useHistory();

  const checkForAdmin = async () => {
    const token = await getAccessTokenSilently();
    const admin = await isAdmin(token, user.nickname);
    console.log(admin);
    if (!admin) {
      history.push('/')
    }
  }

  useEffect(() => {
    checkForAdmin();
  }, [])

  return (
    <div>
      <h1>Admin page</h1>

    </div>
  )
}

export default Admin
