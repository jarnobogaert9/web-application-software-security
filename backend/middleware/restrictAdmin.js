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
    // if admin return 401 because admins can not create resources
    return res.status(401).send({ status: 'Failure', msg: 'You are not authorized to request this resource. You are an administrator and administrators can not access this resource.' });
  }
  return next();
}