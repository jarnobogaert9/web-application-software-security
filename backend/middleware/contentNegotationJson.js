module.exports = (req, res, next) => {
  if (!req.is('application/json')) {
    res.sendStatus(406);
  } else {
    console.log('next');
    next();
  }
};