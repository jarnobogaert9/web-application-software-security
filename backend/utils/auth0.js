const qs = require("qs");
const axios = require("axios").default;

const getToken = async () => {
  const options = {
    method: 'POST',
    url: `${process.env.AUTH0_ISSUER}oauth/token`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_SECRET_ID,
      audience: `${process.env.AUTH0_ISSUER}api/v2/`
    })
  };

  try {
    const response = await axios.request(options);
    return response.data.access_token;
  } catch (err) {
    console.error(err);
  }
}

const getAuth0User = async (sub) => {
  const access_token = await getToken();

  const options = {
    method: 'GET',
    url: `${process.env.AUTH0_ISSUER}api/v2/users/${sub}`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
    },
  };
  const response = await axios.request(options);
  if (response.status === 200) {
    return response.data;
  }
  throw Error('Something went wrong while trying to get user data from auth0.');
}

const getAllAuth0Users = async () => {
  const access_token = await getToken();

  const options = {
    method: 'GET',
    url: `${process.env.AUTH0_ISSUER}api/v2/users`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
    },
  };
  const response = await axios.request(options);
  if (response.status === 200) {
    return response.data;
  }
  throw Error('Something went wrong while trying to get all users from auth0.');
}

const deleteAuth0User = async (sub) => {
  const access_token = await getToken();
  const options = {
    method: 'DELETE',
    url: `${process.env.AUTH0_ISSUER}api/v2/users/${sub}`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
    },
  };
  const response = await axios.request(options);
  if (response.status === 204) {
    return true;
  }
  throw Error('Something went wrong while trying to delete user a in auth0.');
}

const updateAuth0User = async (sub, newNickname) => {
  const access_token = await getToken();
  const options = {
    method: 'PATCH',
    url: `${process.env.AUTH0_ISSUER}api/v2/users/${sub}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
    },
    data: JSON.stringify({ nickname: newNickname })
  };
  const response = await axios.request(options);
  if (response.status === 200) {
    return true;
  }
  throw Error('Something went wrong while trying to update a user in auth0.');
}

module.exports = {
  getAuth0User,
  deleteAuth0User,
  updateAuth0User,
  getAllAuth0Users
}