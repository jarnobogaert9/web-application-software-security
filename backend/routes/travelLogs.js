const checkUser = require('../middleware/checkUser');
const jwtCheck = require('../middleware/jwtCheck');
const TravelLog = require('../models/TravelLog');
const isOwnerOrAdminOfLog = require('../middleware/isOwnerOrAdminOfLog');
const cors = require('cors');
const corsOptions = require('../utils/corsOptions');
const restrictAdmin = require('../middleware/restrictAdmin');
const contentNegotationJson = require('../middleware/contentNegotationJson');
const populateMutatedLogs = require('../utils/populateMutatedLogs');

const router = require('express').Router();

router.options('/', cors({ ...corsOptions, methods: "GET, POST, OPTIONS" }));
router.options('/own', cors({ ...corsOptions, methods: "GET, OPTIONS" }));
router.options('/:id', cors({ ...corsOptions, methods: "DELETE, OPTIONS" }));

/**
 * GET - /travelLogs
 * return all travel logs
 */
router.get('/', cors(corsOptions), async (req, res) => {
  try {
    const logs = await TravelLog.find().populate('owner');

    const mutatedLogs = await populateMutatedLogs(logs)

    res.status(200).send({ msg: 'Get all travel logs', data: mutatedLogs, status: 'success' });
  } catch (err) {
    res.status(500).send({ msg: 'Something went while trying to get all travel logs', status: 'failure' });
  }
});


/**
 * GET - /travelLogs/own
 * return all travel logs of a user based on token
 */
// Because an admin can not create a travel log, an admin can not see his/her own travel logs because the admin has no travel logs
router.get('/own', cors(corsOptions), jwtCheck, checkUser, restrictAdmin, async (req, res) => {
  const { _id } = req.loggedInUser;
  try {
    const logs = await TravelLog.find({ owner: _id });
    res.status(200).send({ msg: 'Get all travel logs for one user', data: logs, status: 'success' });
  } catch (err) {
    res.status(500).send({ msg: 'Something went while trying to get your travel logs', status: 'failure' });
  }
});


/**
 * POST - /travelLogs
 * Create travel log
 */
router.post('/', cors({ ...corsOptions, exposedHeaders: "Location" }), jwtCheck, checkUser, restrictAdmin, contentNegotationJson, async (req, res) => {
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
  res.status(201).json({ msg: 'Travel log created.' });
});

/**
 * DELETE - /travelLogs/:id
 * Delete travel log
 */
router.delete('/:id', cors(corsOptions), jwtCheck, checkUser, isOwnerOrAdminOfLog, async (req, res) => {
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