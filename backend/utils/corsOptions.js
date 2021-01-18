module.exports = {
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, CSRF-Token, X-CSRF-Token",
  credentials: true,
  // origin: process.env.FRONTEND_APP_URL,
  origin: 'https://www.travelr.jarnobogaert.com'
};