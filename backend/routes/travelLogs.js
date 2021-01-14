const checkUser = require('../middleware/checkUser');
const jwtCheck = require('../middleware/jwtCheck');
const TravelLog = require('../models/TravelLog');

const router = require('express').Router();

router.get('/', jwtCheck, checkUser, async (req, res) => {
  console.log(req.loggedInUser);
  console.log(req.loggedInUser.sub);
  const { _id } = req.loggedInUser;
  const logs = await TravelLog.find({ owner: _id })
  res.json({ msg: 'Get all travel logs', data: logs });
});

router.post('/', jwtCheck, checkUser, async (req, res) => {
  console.log(req.body);
  // Validate if all fields are filled in
  for (let prop in req.body) {
    if (!req.body[prop]) {
      console.log('Not filled in');
      return res.status(400).json({ msg: 'All fields are required.' });
    }
  }
  const { _id } = req.loggedInUser;
  const { title, place, description } = req.body;

  // Create travel log if all fields are filled in
  const log = new TravelLog({ title, place, description, owner: _id });
  await log.save();
  res.status(201).json({ msg: 'Endpoint to create travel log' });
});

module.exports = router;