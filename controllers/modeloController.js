const db = require("../models/db");

async function getModelos(req, res) {
  try {
    const query = "SELECT * FROM modelo";
    const rows = await db.executeQuery(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching modelos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getModeloById(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM modelo WHERE idModelo_mod = ?";
    const rows = await db.executeQuery(query, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Modelo not found" });
    }
  } catch (error) {
    console.error("Error fetching modelo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createModelo(req, res) {
  try {
    const { idModelo_mod, idMarca_mod, Descripcion_mod } = req.body;
    const query = "CALL Modelo_AOE(?, ?, ?)";
    await db.executeQuery(query, [idModelo_mod, idMarca_mod, Descripcion_mod]);
    res.json({ Status: "Modelo saved" });
  } catch (error) {
    console.error("Error creating modelo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateModelo(req, res) {
  try {
    const { Descripcion_mod, idMarca_mod } = req.body;
    const { idModelo_mod } = req.params;
    const query = "CALL Modelo_AOE(?, ?, ?)";
    await db.executeQuery(query, [idModelo_mod, idMarca_mod, Descripcion_mod]);
    res.json({ Status: "Modelo updated" });
  } catch (error) {
    console.error("Error updating modelo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteModelo(req, res) {
  try {
    const { id } = req.params;
    const query = "DELETE FROM modelo WHERE idModelo_mod = ?";
    await db.executeQuery(query, [id]);
    res.json({ Status: "Modelo deleted" });
  } catch (error) {
    console.error("Error deleting modelo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getModelos,
  getModeloById,
  createModelo,
  updateModelo,
  deleteModelo,
};
