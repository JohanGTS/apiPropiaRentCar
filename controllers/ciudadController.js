const db = require("../models/db");

async function getCiudades(req, res) {
  try {
    const query = "SELECT * FROM ciudad";
    const rows = await db.executeQuery(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCiudadById(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM ciudad WHERE idCiudad_ciu = ?";
    const rows = await db.executeQuery(query, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Ciudad not found" });
    }
  } catch (error) {
    console.error("Error fetching city by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createCiudad(req, res) {
  try {
    const { idCiudad_ciu, idEstado_ciu, Descripcion_ciu } = req.body;
    const query = "CALL Ciudad_AOE(?, ?, ?)";
    await db.executeQuery(query, [idCiudad_ciu, idEstado_ciu, Descripcion_ciu]);
    res.json({ Status: "Ciudad saved" });
  } catch (error) {
    console.error("Error creating city:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateCiudad(req, res) {
  try {
    const { Descripcion_ciu, idEstado_ciu } = req.body;
    const { idCiudad_ciu } = req.params;
    const query = "CALL Ciudad_AOE(?, ?, ?)";
    await db.executeQuery(query, [idCiudad_ciu, idEstado_ciu, Descripcion_ciu]);
    res.json({ Status: "Ciudad updated" });
  } catch (error) {
    console.error("Error updating city:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteCiudad(req, res) {
  try {
    const { id } = req.params;
    const query = "DELETE FROM ciudad WHERE idCiudad_ciu = ?";
    await db.executeQuery(query, [id]);
    res.json({ Status: "Ciudad deleted" });
  } catch (error) {
    console.error("Error deleting city:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getCiudades,
  getCiudadById,
  createCiudad,
  updateCiudad,
  deleteCiudad,
};
