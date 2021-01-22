const checkUser = require('../middleware/checkUser');
const jwtCheck = require('../middleware/jwtCheck');
const { getAuth0User, deleteAuth0User } = require('../utils/auth0');
const corsOptions = require('../utils/corsOptions');
const cors = require('cors');
const User = require('../models/User');
const contentNegotationJson = require('../middleware/contentNegotationJson');

const router = require('express').Router();


router.options('/:id', cors({ ...corsOptions, methods: "GET, PUT, DELETE, OPTIONS" }))

/**
 * GET - /users/:id
 * Return user info
 */
router.get('/:id', cors(corsOptions), jwtCheck, checkUser, async (req, res) => {
  const { id: nickname } = req.params;

  try {
    const { sub } = req.loggedInUser;
    // Get auth0 data
    const data = await getAuth0User(sub, nickname);
    // Get user from own db to extract role
    const user = await User.findOne({ sub }).populate('role');
    // console.log('here:', user);

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
router.put('/:id', cors(corsOptions), jwtCheck, checkUser, contentNegotationJson, async (req, res) => {
  // const { id: nickname } = req.params;
  const { newNickname } = req.body;

  try {
    const { sub } = req.loggedInUser;
    console.log(sub, newNickname);
    // Update userdata in auth0
    // await updateAuth0User(sub, newNickname);

    res.status(200).send({ msg: 'Your account has been updated.', status: 'success' });
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
  const { id: nickname } = req.params;

  try {
    const { sub } = req.loggedInUser;

    // Delete user in auth0
    // Delete user in own database
    await User.deleteOne({ sub });
    await deleteAuth0User(sub, nickname);

    res.status(200).send({ msg: 'Your account has been deleted.', status: 'success' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Something went wrong while trying to delete your account. Please try again later.', status: 'failure' });
  }
});

module.exports = router;