const TravelLog = require('../models/TravelLog');

module.exports = async (req, res, next) => {
  // Get user id of travel log
  const { id: logId } = req.params;
  // Get user id of user
  const { _id: userId } = req.loggedInUser;

  // TODO check if admin
  // if (isAdmin) {
  //   return next();
  // }

  // Check if user is owner
  const isOwner = await TravelLog.findOne({ _id: logId, owner: userId });
  if (isOwner) {
    next();
  } else {
    return res.status(401).send({ status: 'Failure', msg: 'You are not authorized to request this resource.' })
  }
}