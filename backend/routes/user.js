const checkUser = require('../middleware/checkUser');
const jwtCheck = require('../middleware/jwtCheck');
const corsOptions = require('../utils/corsOptions');
const cors = require('cors');
const User = require('../models/User');

const router = require('express').Router();


router.options('/', cors({ ...corsOptions, methods: "GET, OPTIONS" }))

/**
 * GET - /user
 * Return user based on sub which is being set by the middleware
 */
router.get('/', cors(corsOptions), jwtCheck, checkUser, async (req, res) => {
  try {
    const { sub } = req.loggedInUser;

    const u = await User.findOne({ sub });

    res.status(200).send({ data: u, status: 'success' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Something went wrong while trying to get user', status: 'failure' });
  }
});


module.exports = router;