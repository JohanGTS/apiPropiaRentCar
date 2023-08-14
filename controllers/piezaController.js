const db = require("../models/db");

async function getPiezas(req, res) {
  try {
    const query = "SELECT * FROM pieza";
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching piezas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getPiezaById(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM pieza WHERE idPieza_pie = ?";
    const rows = await db.executeQuery(query, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Pieza not found" });
    }
  } catch (error) {
    console.error("Error fetching pieza:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createPieza(req, res) {
  try {
    const { idPieza_pie, Descripcion_pie } = req.body;
    const query = "CALL Pieza_AOE(?, ?)";
    await db.executeQuery(query, [idPieza_pie, Descripcion_pie]);
    res.json({ Status: "Pieza saved" });
  } catch (error) {
    console.error("Error creating pieza:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updatePieza(req, res) {
  try {
    const { Descripcion_pie } = req.body;
    const { idPieza_pie } = req.params;
    const query = "CALL Pieza_AOE(?, ?)";
    await db.executeQuery(query, [idPieza_pie, Descripcion_pie]);
    res.json({ Status: "Pieza updated" });
  } catch (error) {
    console.error("Error updating pieza:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deletePieza(req, res) {
  try {
    const { id } = req.params;
    const query = "DELETE FROM pieza WHERE idPieza_pie = ?";
    await db.executeQuery(query, [id]);
    res.json({ Status: "Pieza deleted" });
  } catch (error) {
    console.error("Error deleting pieza:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getPiezas,
  getPiezaById,
  createPieza,
  updatePieza,
  deletePieza,
};
