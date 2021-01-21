const checkUser = require('../middleware/checkUser');
const jwtCheck = require('../middleware/jwtCheck');
const { getAuth0User } = require('../utils/auth0');
const corsOptions = require('../utils/corsOptions');
const cors = require('cors');
const User = require('../models/User');

const router = require('express').Router();


/**
 * GET - /users/:id
 * Return user info
 */

router.options('/:id', cors({ ...corsOptions, methods: "GET, OPTIONS" }))

router.get('/:id', cors(corsOptions), jwtCheck, checkUser, async (req, res) => {
  const { id: nickname } = req.params;

  try {
    const { sub } = req.loggedInUser;
    // Get auth0 data
    const data = await getAuth0User(sub, nickname);
    // Get user from own db to extract role
    const user = await User.findOne({ sub }).populate('role');
    console.log('here:', user);

    res.status(200).send({ data: { ...data, role: user.role.type }, status: 'success' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Something went wrong while trying to get user data', status: 'failure' });
  }
});

module.exports = router;