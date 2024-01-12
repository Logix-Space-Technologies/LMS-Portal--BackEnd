require('dotenv').config();

console.log("Host=>"+ process.env.HOST)
console.log("DATABASEUSER=>"+ process.env.DATABASEUSER)
console.log("DATABASEPASSWORD=>"+ process.env.DATABASEPASSWORD)
console.log("DB=>"+ process.env.DB)

module.exports = {
    HOST: process.env.HOST,
    USER: process.env.DATABASEUSER,
    PASSWORD: process.env.DATABASEPASSWORD,
    DB: process.env.DB
  };

