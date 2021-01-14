import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect } from 'react'
import { TRAVELR_API } from '../config/keys';

const TravelLogs = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  console.log(user);

  const fetchTravelLogs = async () => {
    // Make api request to get user travel logs
    const token = await getAccessTokenSilently();

    const response = await fetch(`${TRAVELR_API}/travelLogs`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
  }

  useEffect(() => {
    fetchTravelLogs();
  }, [])
  return (
    <div>
      <h1>Travel Logs</h1>
    </div>
  )
}

export default TravelLogs
