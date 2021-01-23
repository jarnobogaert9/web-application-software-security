const TravelLog = require('../models/TravelLog');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  // Get id of travel log
  const { id: logId } = req.params;
  // Get user id of user
  const { _id: userId } = req.loggedInUser;

  // Get the user who is requesting this
  const u = await User.findById(userId).populate('role');
  const { type } = u.role;
  console.log(u);

  // check if admin
  if (type == 'admin') {
    return next();
  }

  // Check if user is owner
  const isOwner = await TravelLog.findOne({ _id: logId, owner: userId });
  if (isOwner) {
    next();
  } else {
    return res.status(403).send({ status: 'Failure', msg: 'You are not authorized to request this resource.' })
  }
}