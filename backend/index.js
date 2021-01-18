require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const morgan = require('morgan');
const jwtCheck = require('./middleware/jwtCheck');
const travelLogs = require('./routes/travelLogs');
const users = require('./routes/users');

const PORT = process.env.PORT || 4000;

mongoose.connect(`mongodb+srv://admin123:${process.env.MONGODB_PWD}@cluster0.ooeji.mongodb.net?retryWrites=true&w=majority`).then(() => {
  console.log('Connected to mongodb database');
}).catch(err => {
  console.log(err);
});

// TODO vermijdt MIME sniffin: x-content-type-options: nosniff wordt door cloudflare gedaan


app.use(express.json());
app.use(morgan('tiny'))
// app.use(jwtCheck);

app.use('/travelLogs', travelLogs);
app.use('/users', users);


app.get('/', (req, res) => {
  res.json({
    name: 'Travelr API'
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