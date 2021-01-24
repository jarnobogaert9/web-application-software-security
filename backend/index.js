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
const user = require('./routes/user');
const Role = require('./models/Role');


const PORT = process.env.PORT || 4000;

mongoose.connect(`mongodb+srv://admin123:${process.env.MONGODB_PWD}@cluster0.ooeji.mongodb.net/softwareSec?retryWrites=true&w=majority`).then(async () => {
  console.log('Connected to mongodb database');
  // Make sure roles are created
  const findAdminRole = await Role.findOne({ type: 'admin' });
  const findNormalRole = await Role.findOne({ type: 'normal' });
  if (!findAdminRole) {
    // Create admin role
    const adminRole = new Role({ type: 'admin' });
    await adminRole.save();
  }
  if (!findNormalRole) {
    // Create normal role
    const normalRole = new Role({ type: 'normal' });
    await normalRole.save();
  }
}).catch(err => {
  console.log(err);
});

// MIME sniffin: x-content-type-options: nosniff wordt door cloudflare gedaan


app.use(express.json());
app.use(morgan('tiny'))

app.use('/travelLogs', travelLogs);
app.use('/users', users);
app.use('/user', user);

app.options('/', cors({ ...corsOptions, methods: "GET OPTIONS" }));

app.get('/', (req, res) => {
  res.json({
    name: 'Travelr API'
  })
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});