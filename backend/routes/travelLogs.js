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

router.post('/', jwtCheck, (req, res) => {
  res.json({ msg: 'Endpoint to create travel log' });
});

module.exports = router;