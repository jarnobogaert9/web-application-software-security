import { TRAVELR_API } from '../config/keys';

const getAllTravelLogs = async () => {
  // Make api request to get user travel logs
  try {
    const response = await fetch(`${TRAVELR_API}/travelLogs`, {
      headers: {
        Accept: 'application/json'
      }
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
    if (response.status === 200) {
      return json.data;
    } else {
      return [];
    }
  } catch (err) {
    return [];
  }
}

const getOwnTravelLogs = async ({ token }) => {
  // Make api request to get user travel logs
  try {
    const response = await fetch(`${TRAVELR_API}/travelLogs/own`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
    if (response.status === 200) {
      return json.data;
    } else {
      return [];
    }
  } catch (err) {
    return [];
  }
}

const deleteTravelLog = async ({ token, id }) => {
  const response = await fetch(`${TRAVELR_API}/travelLogs/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  });
  console.log(response);
  const json = await response.json();
  console.log(json);
  if (response.status === 200) {
    return true;
  }
}

export { getAllTravelLogs, getOwnTravelLogs, deleteTravelLog }