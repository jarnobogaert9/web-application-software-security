const User = require('../models/User');

module.exports = async (req, res, next) => {
  // Get user id of user
  const { _id: userId } = req.loggedInUser;

  // Get the user who is requesting this
  const u = await User.findById(userId).populate('role');
  const { type } = u.role;
  console.log(u);

  // check if admin
  if (type == 'admin') {
    // if admin return 403 because admins can not create resources
    return res.status(403).send({ status: 'Failure', msg: 'You are not authorized to request this resource.' });
  }
  return next();
}