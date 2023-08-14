// config/dbConfig.js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({

  host: "database-1.chuzigqememf.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "juasjuas123",
  database: "my_db",
  port: "3306",
  connectionLimit: 10, // Adjust as needed
});

module.exports = pool;
