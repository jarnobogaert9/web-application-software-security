const checkUser = require('../middleware/checkUser');
const jwtCheck = require('../middleware/jwtCheck');
const { getAuth0User } = require('../utils/auth0');

const router = require('express').Router();


/**
 * GET - /users/:id
 * Return user info
 */
router.get('/:id', jwtCheck, checkUser, async (req, res) => {
  const { id: nickname } = req.params;

  try {
    const data = await getAuth0User(req.loggedInUser.sub, nickname);
    res.status(200).send({ data: data, status: 'success' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Something went wrong while trying to get user data', status: 'failure' });
  }
});

module.exports = router;