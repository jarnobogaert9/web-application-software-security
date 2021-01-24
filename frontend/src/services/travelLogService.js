import { TRAVELR_API } from '../config/keys';

const getAllTravelLogs = async () => {
  // Make api request to get user travel logs
  try {
    const response = await fetch(`${TRAVELR_API}/travelLogs`, {
      headers: {
        Accept: 'application/json'
      }
    });
    const json = await response.json();
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
    const json = await response.json();
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
    const json = await response.json();
    if (response.status === 201) {
      return [true, json];
    } else {
      return [false, json];
    }
  } catch (err) {
    return [false, err];
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
    const json = await response.json();
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

const updateTravelLog = async ({ token, id, data }) => {
  console.log(data);
  try {
    const response = await fetch(`${TRAVELR_API}/travelLogs/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

const getOneTravelLog = async ({ token, id }) => {
  try {
    const response = await fetch(`${TRAVELR_API}/travelLogs/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    });
    const json = await response.json();
    if (response.status === 200) {
      return json.data;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

export {
  getAllTravelLogs,
  getOwnTravelLogs,
  deleteTravelLog,
  createTraveLog,
  updateTravelLog,
  getOneTravelLog
}