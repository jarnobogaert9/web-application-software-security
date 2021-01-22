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

const createTraveLog = async ({ token, data }) => {
  try {
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
    if (response === 201) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

const deleteTravelLog = async ({ token, id }) => {
  try {
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
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }

}

export { getAllTravelLogs, getOwnTravelLogs, deleteTravelLog, createTraveLog }