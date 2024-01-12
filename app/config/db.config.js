require('dotenv').config();


module.exports = {
    HOST: process.env.HOST,
    USER: process.env.DATABASEUSER,
    PASSWORD: process.env.DATABASEPASSWORD,
    DB: process.env.DB
  };

