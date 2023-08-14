const db = require("../models/db");

async function getCombustibles(req, res) {
  try {
    const query = "SELECT * FROM combustible";
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching combustibles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCombustibleById(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM combustible WHERE idCombustible_com = ?";
    const rows = await db.executeQuery(query, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Combustible not found" });
    }
  } catch (error) {
    console.error("Error fetching combustible by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createCombustible(req, res) {
  try {
    const { idCombustible_com, Descripcion_com } = req.body;
    const query = "CALL Combustible_AOE(?, ?)";
    await db.executeQuery(query, [idCombustible_com, Descripcion_com]);
    res.json({ Status: "Combustible saved" });
  } catch (error) {
    console.error("Error creating combustible:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateCombustible(req, res) {
  try {
    const { Descripcion_com } = req.body;
    const { idCombustible_com } = req.params;
    const query = "CALL Combustible_AOE(?, ?)";
    await db.executeQuery(query, [idCombustible_com, Descripcion_com]);
    res.json({ Status: "Combustible updated" });
  } catch (error) {
    console.error("Error updating combustible:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteCombustible(req, res) {
  try {
    const { id } = req.params;
    const query = "DELETE FROM combustible WHERE idCombustible_com = ?";
    await db.executeQuery(query, [id]);
    res.json({ Status: "Combustible deleted" });
  } catch (error) {
    console.error("Error deleting combustible:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getCombustibles,
  getCombustibleById,
  createCombustible,
  updateCombustible,
  deleteCombustible,
};
