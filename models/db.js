// models/db.js
const pool = require("../config/dbConfig");

async function executeQuery(query, values = []) {
  let connection; // Declare the connection variable
  try {
    
    connection = await pool.getConnection(); // Assign the connection object
    const [rows] = await connection.query(query, values);

    return rows;
  } catch (error) {
   
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = {
  executeQuery,
};
