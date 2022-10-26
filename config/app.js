require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  clientID: process.env.CLIENT_ID,
  redirectUrl: process.env.REDIRECT_URL,
  authorizationHost: process.env.AUTHORIZATION_HOST,
  clientSecret: process.env.CLIENT_SECRET,
};
