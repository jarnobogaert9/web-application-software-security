const qs = require("qs");

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

const getAuth0User = async (sub, nickname) => {
  const access_token = await getToken();

  const options = {
    method: 'GET',
    url: `${process.env.AUTH0_ISSUER}api/v2/users/${sub}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${access_token}`
    },
  };
  const response = await axios.request(options);
  if (nickname === response.data.nickname) {
    return response.data;
  }
  throw Error('Nickname does not match');
}

module.exports = { getAuth0User }