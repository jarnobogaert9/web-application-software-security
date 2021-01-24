const checkUser = require('../middleware/checkUser');
const jwtCheck = require('../middleware/jwtCheck');
const { getAuth0User, deleteAuth0User, updateAuth0User, getAllAuth0Users } = require('../utils/auth0');
const corsOptions = require('../utils/corsOptions');
const cors = require('cors');
const User = require('../models/User');
const contentNegotationJson = require('../middleware/contentNegotationJson');
const isOwnerOfUser = require('../middleware/isOwnerOfUser');
const TravelLog = require('../models/TravelLog');

const router = require('express').Router();

router.options('/', cors({ ...corsOptions, methods: "GET, OPTIONS" }));
router.options('/:id', cors({ ...corsOptions, methods: "GET, PUT, DELETE, OPTIONS" }))

/**
 * GET - /users
 * Return users
 */
router.get('/', cors(corsOptions), async (req, res) => {
  try {
    // Get users
    const users = await getAllAuth0Users();
    const mutatedUsers = [];

    for (let user of users) {
      const { email, nickname, user_id, email_verified } = user;
      mutatedUsers.push({
        email,
        nickname,
        sub: user_id,
      })
    }

    res.status(200).send({ data: mutatedUsers, status: 'success' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Something went wrong while trying to get all users', status: 'failure' });
  }
});

/**
 * GET - /users/:id
 * Return user info
 */
router.get('/:id', cors(corsOptions), jwtCheck, checkUser, async (req, res) => {
  const { id: sub } = req.params;

  try {
    // Get auth0 data
    const data = await getAuth0User(sub);
    // Get user from own db to extract role
    const user = await User.findOne({ sub }).populate('role');

    res.status(200).send({ data: { ...data, role: user.role.type }, status: 'success' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Something went wrong while trying to get user data', status: 'failure' });
  }
});


/**
 * PUT - /users/:id
 * Update user
 */
router.put('/:id', cors(corsOptions), jwtCheck, checkUser, isOwnerOfUser, contentNegotationJson, async (req, res) => {
  const { id: sub } = req.params;
  const { newNickname } = req.body;

  try {
    console.log("Update data of user:", sub);
    console.log(sub, newNickname);

    if (sub.includes('google-oauth2')) {
      return res.status(202).send({ msg: 'A nickname of a google account can not be changed through Travelr. You need to change this in your google account itself.', status: 'success' });
    }

    // Update userdata in auth0
    await updateAuth0User(sub, newNickname);

    res.status(200).send({ msg: 'Account has been updated.', status: 'success' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Something went wrong while trying to udpate your account. Please try again later.', status: 'failure' });
  }
});


/**
 * DELETE - /users/:id
 * Delete user
 */
router.delete('/:id', cors(corsOptions), jwtCheck, checkUser, async (req, res) => {
  const { id: sub } = req.params;

  try {
    console.log("Delete data of user:", sub);

    const u = await User.findOne({ sub });

    // Delete travel logs of user
    await TravelLog.deleteMany({ owner: u });

    // Delete user in own database
    // Delete user in auth0
    await u.delete();
    await deleteAuth0User(sub);
    // console.log(d);
    // console.log(u);

    res.status(200).send({ msg: 'Account has been deleted.', status: 'success' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Something went wrong while trying to delete your account. Please try again later.', status: 'failure' });
  }
});

module.exports = router;