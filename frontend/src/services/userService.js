import { TRAVELR_API } from '../config/keys';

const deleteUserAccount = async ({ token, sub }) => {
  // Make api request to get user travel logs
  try {
    const response = await fetch(`${TRAVELR_API}/users/${sub}`, {
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
      return {
        ...json,
        deleted: true
      };
    } else {
      return {
        ...json,
        deleted: false
      };
    }
  } catch (err) {
    return {
      deleted: false
    };
  }
}

const updateUserAccount = async ({ token, sub, newNickname }) => {
  try {
    const response = await fetch(`${TRAVELR_API}/users/${sub}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ newNickname })
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
    if (response.status === 200) {
      return {
        ...json,
        updated: true
      };
    } else {
      return {
        ...json,
        updated: false
      };
    }
  } catch (err) {
    return {
      updated: false,
      msg: 'Something went wrong while trying to update your data.'
    };
  }
}

const getAllUserAccounts = async () => {
  try {
    const response = await fetch(`${TRAVELR_API}/users`, {
      method: 'GET',
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

const getUser = async ({ token }) => {
  try {
    const response = await fetch(`${TRAVELR_API}/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
    if (response.status === 200) {
      return json.data;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

const downloadUserData = async ({ token, sub }) => {
  try {
    const response = await fetch(`${TRAVELR_API}/users/${sub}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
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
  deleteUserAccount,
  updateUserAccount,
  getAllUserAccounts,
  getUser,
  downloadUserData
}