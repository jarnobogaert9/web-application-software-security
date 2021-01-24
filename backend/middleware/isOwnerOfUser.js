const User = require('../models/User');

module.exports = async (req, res, next) => {
  // Get sub of request parameter
  const { id: sub } = req.params;
  // Get user id of the user doing the authenticated request
  const { _id: userId } = req.loggedInUser;

  // Check if user is owner
  const isOwner = await User.findOne({ _id: userId, sub });
  // const isOwner = await User.findOne({ _id: userId, sub: 'auth0|5f79e01684b0d3007515656c' });
  console.log("User is owner of user:", isOwner);
  if (isOwner) {
    next();
  } else {
    return res.status(403).send({ status: 'Failure', msg: 'You are not authorized to request this resource.' })
  }
}