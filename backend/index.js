require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const jwtCheck = require('./middleware/jwtCheck');
const logs = require('./routes/logs');

const PORT = process.env.PORT || 4000;


app.use(cors());
// app.use(jwtCheck);

app.use('/logs', logs);

app.get('/', (req, res) => {
  res.json({
    name: 'Travelr API'
  })
});

app.get('/authorized', async function (req, res) {
  // const token = req.header('Authorization');
  console.log(req.user);


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