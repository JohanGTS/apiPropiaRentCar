const db = require("../models/db");

async function getUnidades(req, res) {
  try {
    const query = "SELECT * FROM unidad";
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getUnidadesById(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM unidad WHERE idunidad_und = ?";
    const rows = await db.executeQuery(query, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Unidad not found" });
    }
  } catch (error) {
    console.error("Error fetching Unidad:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getUnidades,
  getUnidadesById,
};
