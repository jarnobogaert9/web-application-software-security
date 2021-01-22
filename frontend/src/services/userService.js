import { TRAVELR_API } from '../config/keys';

const deleteUserAccount = async ({ token, nickname }) => {
  // Make api request to get user travel logs
  try {
    const response = await fetch(`${TRAVELR_API}/users/${nickname}`, {
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

const updateUserAccount = async ({ token, nickname, newNickname }) => {
  try {
    const response = await fetch(`${TRAVELR_API}/users/${nickname}`, {
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

export {
  deleteUserAccount,
  updateUserAccount
}