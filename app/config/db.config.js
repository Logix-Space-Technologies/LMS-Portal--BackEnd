require('dotenv').config({ path: '../../.env' });

module.exports = {
    HOST: process.env.HOST,
    USER: process.env.DBUSER,
    PASSWORD: process.env.DBUSERPASSWORD,
    DB: process.env.DB
  };

