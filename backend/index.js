require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const jwtCheck = require('./middleware/jwtCheck');
const logs = require('./routes/logs');

const PORT = process.env.PORT || 4000;

// TODO: laat alleen requests van origins uit arrary toe anders geef je fout melding (400)
// TODO vermijdt MIME sniffin: x-content-type-options: nosniff

app.use(cors());
// app.use(jwtCheck);

app.use('/logs', logs);

app.get('/', (req, res) => {
  res.json({
    name: 'Travelr API'
  })
});

app.get('/test', (req, res) => {
  // console.log(req);
  console.log("Received request");
  res.status(200).json({
    msg: 'Test route'
  })
});

app.get('/authorized', jwtCheck, async function (req, res) {
  const token = req.header('Authorization');
  console.log(req.user);

  // TODO get user role
  const userinfoUrl = 'https://dev-dnjlv1qu.eu.auth0.com/userinfo'
  const url = 'https://dev-dnjlv1qu.eu.auth0.com/api/v2/users'

  axios.get(`${userinfoUrl}`, {
    headers: {
      'Authorization': `${token}`
    }
  }).then(resp => {
    console.log(resp.data);
  }).catch(err => {
    console.log(err);
  })

  // var options = {
  //   method: 'GET',
  //   url: 'https://dev-dnjlv1qu.eu.auth0.com/api/v2/users',
  //   headers: { authorization: `${token}` }
  // };

  // axios.default.request(options).then(function (response) {
  //   console.log(response.data);
  // }).catch(function (error) {
  //   console.error(error);
  // });


  // console.log(token);
  // console.log(id);
  // console.log(req.user);
  // const url = `${process.env.AUTH0_ISSUER}api/v2/users/${id}`
  // console.log(url);
  // const options = {
  //   method: 'GET',
  //   url: url,
  //   headers: { authorization: `${token}` }
  // };

  // const response = await axios.get();
  // console.log(response);
  res.json({
    msg: 'Secured Resource'
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});