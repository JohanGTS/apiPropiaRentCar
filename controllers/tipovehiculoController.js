const db = require("../models/db");

async function getTiposVehiculo(req, res) {
  try {
    const query = "SELECT * FROM tipovehiculo";
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching tipos de vehículo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getTipoVehiculoById(req, res) {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM tipovehiculo WHERE idTipoVehiculo_tipveh = ?";
    const rows = await db.executeQuery(query, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Tipo de vehículo not found" });
    }
  } catch (error) {
    console.error("Error fetching tipo de vehículo by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createTipoVehiculo(req, res) {
  const { idTipoVehiculo_tipveh, Descripcion_tipveh } = req.body;
  try {
    const query = "CALL TipoVehiculo_AOE(?, ?)";
    await db.executeQuery(query, [idTipoVehiculo_tipveh, Descripcion_tipveh]);
    res.json({ Status: "Tipo de vehículo saved" });
  } catch (error) {
    console.error("Error creating tipo de vehículo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateTipoVehiculo(req, res) {
  const { Descripcion_tipveh } = req.body;
  const { idTipoVehiculo_tipveh } = req.params;
  try {
    const query = "CALL TipoVehiculo_AOE(?, ?)";
    await db.executeQuery(query, [idTipoVehiculo_tipveh, Descripcion_tipveh]);
    res.json({ Status: "Tipo de vehículo updated" });
  } catch (error) {
    console.error("Error updating tipo de vehículo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteTipoVehiculo(req, res) {
  const { id } = req.params;
  try {
    const query = "DELETE FROM tipovehiculo WHERE idTipoVehiculo_tipveh = ?";
    await db.executeQuery(query, [id]);
    res.json({ Status: "Tipo de vehículo deleted" });
  } catch (error) {
    console.error("Error deleting tipo de vehículo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getTiposVehiculo,
  getTipoVehiculoById,
  createTipoVehiculo,
  updateTipoVehiculo,
  deleteTipoVehiculo,
};
