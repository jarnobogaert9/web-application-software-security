import { TRAVELR_API } from '../config/keys';

const getAllTravelLogs = async () => {
  // Make api request to get user travel logs
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
  }
}

const getOwnTravelLogs = async ({ token }) => {
  // Make api request to get user travel logs

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