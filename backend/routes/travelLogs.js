const jwtCheck = require('../middleware/jwtCheck');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ msg: 'Get all travel logs' });
});

router.post('/', jwtCheck, (req, res) => {
  res.json({ msg: 'Endpoint to create travel log' });
});

module.exports = router;