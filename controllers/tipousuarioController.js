const db = require("../models/db");

async function getTiposUsuario(req, res) {
  try {
    const query = "SELECT * FROM tipousuario";
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching tipos de usuario:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getTipoUsuarioById(req, res) {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM tipousuario WHERE idTipoUsuario_tipusu = ?";
    const rows = await db.executeQuery(query, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Tipo de usuario not found" });
    }
  } catch (error) {
    console.error("Error fetching tipo de usuario by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createTipoUsuario(req, res) {
  const { idTipoUsuario_tipusu, Descripcion_usu } = req.body;
  try {
    const query = "CALL TipoUsuario_AOE(?, ?)";
    await db.executeQuery(query, [idTipoUsuario_tipusu, Descripcion_usu]);
    res.json({ Status: "Tipo de usuario saved" });
  } catch (error) {
    console.error("Error creating tipo de usuario:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateTipoUsuario(req, res) {
  const { Descripcion_usu } = req.body;
  const { idTipoUsuario_tipusu } = req.params;
  try {
    const query = "CALL TipoUsuario_AOE(?, ?)";
    await db.executeQuery(query, [idTipoUsuario_tipusu, Descripcion_usu]);
    res.json({ Status: "Tipo de usuario updated" });
  } catch (error) {
    console.error("Error updating tipo de usuario:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteTipoUsuario(req, res) {
  const { id } = req.params;
  try {
    const query = "DELETE FROM tipousuario WHERE idTipoUsuario_tipusu = ?";
    await db.executeQuery(query, [id]);
    res.json({ Status: "Tipo de usuario deleted" });
  } catch (error) {
    console.error("Error deleting tipo de usuario:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getTiposUsuario,
  getTipoUsuarioById,
  createTipoUsuario,
  updateTipoUsuario,
  deleteTipoUsuario,
};
