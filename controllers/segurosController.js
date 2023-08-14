const db = require("../models/db");

async function getSeguros(req, res) {
  try {
    const query = "SELECT * FROM seguro";
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching seguros:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getSeguroById(req, res) {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM seguro WHERE idSeguro_seg = ?";
    const rows = await db.executeQuery(query, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Seguro not found" });
    }
  } catch (error) {
    console.error("Error fetching seguro by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createSeguro(req, res) {
  const { idSeguro_seg, Plan_seg, Descripcion_seg } = req.body;
  try {
    const query = "CALL Seguro_AOE(?, ?, ?)";
    await db.executeQuery(query, [idSeguro_seg, Plan_seg, Descripcion_seg]);
    res.json({ Status: "Seguro saved" });
  } catch (error) {
    console.error("Error creating seguro:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateSeguro(req, res) {
  const { Descripcion_seg, Plan_seg } = req.body;
  const { idSeguro_seg } = req.params;
  try {
    const query = "CALL Seguro_AOE(?, ?, ?)";
    await db.executeQuery(query, [idSeguro_seg, Plan_seg, Descripcion_seg]);
    res.json({ Status: "Seguro updated" });
  } catch (error) {
    console.error("Error updating seguro:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteSeguro(req, res) {
  const { id } = req.params;
  try {
    const query = "DELETE FROM seguro WHERE idSeguro_seg = ?";
    await db.executeQuery(query, [id]);
    res.json({ Status: "Seguro deleted" });
  } catch (error) {
    console.error("Error deleting seguro:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getSeguros,
  getSeguroById,
  createSeguro,
  updateSeguro,
  deleteSeguro,
};
