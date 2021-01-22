const { getAuth0User } = require('./auth0');

module.exports = async (logs) => {
  const mutatedLogs = [];
  // == Add corresponding username/nickname to each log
  for (let log of logs) {
    const { sub } = log.owner;
    // Get username/nickname from auth0 for a given sub
    const u = await getAuth0User(sub);
    const { nickname } = u;

    const temp = log.toObject();

    delete temp.owner.sub;
    delete temp.owner.role;
    delete temp.owner._id;
    delete temp.owner.__v;
    // Set nickname
    temp.owner.nickname = nickname;

    mutatedLogs.push(temp);
  }

  return mutatedLogs;
}