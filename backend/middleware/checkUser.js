const User = require('../models/User')
const Role = require('../models/Role')

module.exports = async (req, res, next) => {
  // console.log(req.user);
  const { sub } = req.user;
  // get user id (sub)
  // console.log(sub);

  // check if user already exists in our db
  // if not create new user
  const found = await User.findOne({ sub: sub });
  // console.log(found);
  if (!found) {
    // User is not found => create user
    // Get normalRole so we can add it to the user
    const normalRole = await Role.findOne({ type: 'normal' });
    const u = new User({ sub, role: normalRole._id });
    await u.save();
    req.loggedInUser = u;
  } else {
    req.loggedInUser = found;
  }
  next();
}