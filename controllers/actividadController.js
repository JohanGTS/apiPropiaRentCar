const db = require("../models/db");

async function getActividades(req, res) {
  try {
    const query = "SELECT * FROM actividad";
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getActividadesById(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM actividad WHERE idactividad_act = ?";
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
  getActividades,
  getActividadesById,
};
