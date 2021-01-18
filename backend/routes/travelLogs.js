const checkUser = require('../middleware/checkUser');
const jwtCheck = require('../middleware/jwtCheck');
const TravelLog = require('../models/TravelLog');
const isOwnerOrAdmin = require('../utils/isOwnerOrAdmin');

const router = require('express').Router();

// router.options('/', (req, res) => {
//   res.header('Access-Control-Allow-Origin', ['http://localhost:4000', 'http://localhost:3000']);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//   res.send(200);
// })

/**
 * GET - /travelLogs
 * Should return all travel logs
 */
router.get('/', async (req, res) => {
  try {
    const logs = await TravelLog.find().populate('owner');
    res.send({ msg: 'Get all travel logs', data: logs, status: 'success' });
  } catch (err) {
    res.status(500).send({ msg: 'Something went while trying to get all travel logs', status: 'failure' });
  }
});


/**
 * GET - /travelLogs/own
 * Should return all travel logs of a user based on token
 */
router.get('/own', jwtCheck, checkUser, async (req, res) => {
  console.log(req.loggedInUser);
  console.log(req.loggedInUser.sub);
  const { _id } = req.loggedInUser;
  try {
    const logs = await TravelLog.find({ owner: _id });
    res.send({ msg: 'Get all travel logs for one user', data: logs, status: 'success' });
  } catch (err) {
    res.status(500).send({ msg: 'Something went while trying to get your travel logs', status: 'failure' });
  }
});


/**
 * POST - /travelLogs
 * Create travel log
 */
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

/**
 * DELETE - /travelLogs
 * Delete travel log
 */
router.delete('/:id', jwtCheck, checkUser, isOwnerOrAdmin, async (req, res) => {
  // console.log(req.body);
  // Get id of travel log
  const { id: logId } = req.params;
  // Check if either the user doing the request is the onwer or an administrator


  // // Create travel log if all fields are filled in
  // const log = new TravelLog({ title, place, description, owner: _id });
  // await log.save();
  // res.status(201).json({ msg: 'Endpoint to create travel log' });
  res.status(200).send({ msg: 'Travel log deleted', status: 'success' });
});


module.exports = router;