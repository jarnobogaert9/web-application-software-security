const TravelLog = require('../models/TravelLog');

module.exports = async (req, res, next) => {
  const { id: logId } = req.params;
  console.log(logId, 'in middleware');

  // Get user id
  const { _id: userId } = req.loggedInUser;

  // Check if user is owner
  const isOwner = await TravelLog.findOne({ _id: logId, owner: userId });
  if (isOwner) {
    await isOwner.remove();
  } else {
    return res.status(401).send({ status: 'Failure', msg: 'You are not authorized to request this resource.' })
  }
  next();
}