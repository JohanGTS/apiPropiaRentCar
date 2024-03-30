const db = require("../models/db");

async function getCategorias(req, res) {
  try {
    const query = "SELECT * FROM categoria";
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCategoriasById(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM categoria WHERE idcategoria_ctg = ?";
    const rows = await db.executeQuery(query, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Categoria not found" });
    }
  } catch (error) {
    console.error("Error fetching categoria:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getCategorias,
  getCategoriasById,
};
