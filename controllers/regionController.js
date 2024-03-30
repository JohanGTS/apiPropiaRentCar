const db = require("../models/db");

async function getRegiones(req, res) {
  try {
    const query = "SELECT * FROM region";
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getRegionesById(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM region WHERE idregion_reg = ?";
    const rows = await db.executeQuery(query, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Componente not found" });
    }
  } catch (error) {
    console.error("Error fetching componente:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getRegiones,
  getRegionesById,
};
