// controllers/coloresController.js
const db = require("../models/db");

async function getColores(req, res) {
  try {
    const query = "SELECT * FROM color";
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getColoresById(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM color WHERE idColor_col = ?";
    const rows = await db.executeQuery(query, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Color not found" });
    }
  } catch (error) {
    console.error("Error fetching color:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createColor(req, res) {
  try {
    const { idColor_col, Descripcion_col } = req.body;
    const query = "CALL Color_AOE(?, ?)";
    await db.executeQuery(query, [idColor_col, Descripcion_col]);
    res.json({ Status: "Color saved" });
  } catch (error) {
    console.error("Error creating color:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateColor(req, res) {
  try {
    const { Descripcion_col } = req.body;
    const { idColor_col } = req.params;
    const query = "CALL Color_AOE(?, ?)";
    await db.executeQuery(query, [idColor_col, Descripcion_col]);
    res.json({ Status: "Color updated" });
  } catch (error) {
    console.error("Error updating color:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteColor(req, res) {
  try {
    const { id } = req.params;
    await db.executeQuery("DELETE FROM color WHERE idColor_col = ?", [id]);
    res.json({ Status: "Color deleted" });
  } catch (error) {
    console.error("Error deleting color:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getColores,
  getColoresById,
  createColor,
  updateColor,
  deleteColor,
};
