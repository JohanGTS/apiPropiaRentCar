const db = require("../models/db");

async function getDocumentos(req, res) {
  try {
    const query = "SELECT * FROM documento";
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching documentos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getDocumentoById(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM documento WHERE idDocumento_doc = ?";
    const rows = await db.executeQuery(query, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Documento not found" });
    }
  } catch (error) {
    console.error("Error fetching documento:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createDocumento(req, res) {
  try {
    const { idDocumento_doc, Descripcion_doc } = req.body;
    const query = "CALL Documento_AOE(?, ?)";
    await db.executeQuery(query, [idDocumento_doc, Descripcion_doc]);
    res.json({ Status: "Documento saved" });
  } catch (error) {
    console.error("Error creating documento:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateDocumento(req, res) {
  try {
    const { Descripcion_doc } = req.body;
    const { idDocumento_doc } = req.params;
    const query = "CALL Documento_AOE(?, ?)";
    await db.executeQuery(query, [idDocumento_doc, Descripcion_doc]);
    res.json({ Status: "Documento updated" });
  } catch (error) {
    console.error("Error updating documento:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteDocumento(req, res) {
  try {
    const { id } = req.params;
    const query = "DELETE FROM documento WHERE idDocumento_doc = ?";
    await db.executeQuery(query, [id]);
    res.json({ Status: "Documento deleted" });
  } catch (error) {
    console.error("Error deleting documento:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getDocumentos,
  getDocumentoById,
  createDocumento,
  updateDocumento,
  deleteDocumento,
};
