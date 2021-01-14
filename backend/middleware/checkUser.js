const User = require('../models/User')

module.exports = async (req, res, next) => {
  // console.log(req.user);
  const { sub } = req.user;
  // get user id (sub)
  console.log(sub);

  // check if user already exists in our db
  // if not create new user
  const found = await User.findOne({ sub: sub });
  console.log(found);
  if (!found) {
    // User is not found => create user
    const u = new User({ sub, sub, admin: false });
    await u.save();
    req.loggedInUser = u;
  } else {
    req.loggedInUser = found;
  }
  // TODO: create post with id of the user
  next();
}