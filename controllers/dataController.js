// controllers/dataController.js
const db = require("../models/db");

async function getData(req, res) {
  try {
    const query = "SELECT * FROM color";
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getData,
};
