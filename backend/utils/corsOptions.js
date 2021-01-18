module.exports = {
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, CSRF-Token, X-CSRF-Token",
  credentials: true,
  origin: process.env.APP_ORIGIN,
  // origin: 'https://www.travelr.jarnobogaert.com'
  // origin: 'http://localhost:3000'
};