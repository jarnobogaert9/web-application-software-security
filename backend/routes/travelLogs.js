const checkUser = require('../middleware/checkUser');
const jwtCheck = require('../middleware/jwtCheck');
const TravelLog = require('../models/TravelLog');
const isOwnerOrAdmin = require('../utils/isOwnerOrAdmin');
const cors = require('cors');
const corsOptions = require('../utils/corsOptions');

const router = require('express').Router();

// router.options('/', (req, res) => {
//   res.header('Access-Control-Allow-Origin', ['http://localhost:4000', 'http://localhost:3000']);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//   res.send(200);
// })

/**
 * GET - /travelLogs
 * return all travel logs
 */

router.options('/', cors({ ...corsOptions, methods: "GET, POST, OPTIONS" }));
router.options('/own', cors({ ...corsOptions, methods: "GET, OPTIONS" }));
router.options('/:id', cors({ ...corsOptions, methods: "DELETE, OPTIONS" }));

router.get('/', cors(corsOptions), async (req, res) => {
  try {
    const logs = await TravelLog.find().populate('owner');
    res.send({ msg: 'Get all travel logs', data: logs, status: 'success' });
  } catch (err) {
    res.status(500).send({ msg: 'Something went while trying to get all travel logs', status: 'failure' });
  }
});


/**
 * GET - /travelLogs/own
 * return all travel logs of a user based on token
 */
router.get('/own', cors(corsOptions), jwtCheck, checkUser, async (req, res) => {
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
router.post('/', cors({ ...corsOptions, exposedHeaders: "Location" }), jwtCheck, checkUser, async (req, res) => {
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
router.delete('/:id', cors(corsOptions), jwtCheck, checkUser, isOwnerOrAdmin, async (req, res) => {
  // Get id of travel log
  const { id: logId } = req.params;

  try {
    await TravelLog.deleteOne({ _id: logId })
    res.status(200).send({ msg: 'Travel log deleted', status: 'success' });
  } catch (error) {
    res.status(500).send({ msg: 'Something went wrong while trying to delete a travel log', status: 'failure' });
  }
});


module.exports = router;