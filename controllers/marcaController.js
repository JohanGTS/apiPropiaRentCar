const db = require("../models/db");

async function getMarcas(req, res) {
  try {
    const query = "SELECT * FROM marca";
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching marcas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getMarcaById(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM marca WHERE idMarca_mar = ?";
    const rows = await db.executeQuery(query, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Marca not found" });
    }
  } catch (error) {
    console.error("Error fetching marca:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createMarca(req, res) {
  try {
    const { idMarca_mar, Descripcion_mar } = req.body;
    const query = "CALL Marca_AOE(?, ?)";
    await db.executeQuery(query, [idMarca_mar, Descripcion_mar]);
    res.json({ Status: "Marca saved" });
  } catch (error) {
    console.error("Error creating marca:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateMarca(req, res) {
  try {
    const { idMarca_mar, Descripcion_mar } = req.body;
    const query = "CALL Marca_AOE(?, ?)";
    await db.executeQuery(query, [idMarca_mar, Descripcion_mar]);
    res.json({ Status: "Marca updated" });
  } catch (error) {
    console.error("Error updating marca:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteMarca(req, res) {
  try {
    const { id } = req.params;
    const query = "DELETE FROM marca WHERE idMarca_mar = ?";
    await db.executeQuery(query, [id]);
    res.json({ Status: "Marca deleted" });
  } catch (error) {
    console.error("Error deleting marca:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getMarcas,
  getMarcaById,
  createMarca,
  updateMarca,
  deleteMarca,
};
