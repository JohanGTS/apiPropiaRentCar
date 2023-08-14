const db = require("../models/db");

async function getPendingCancelaciones(req, res) {
  try {
    const query = `
      SELECT 
        cancelacion_reserva.*, reserva.idCliente_res,
        (SELECT idRecepcionOnline_fac FROM factura WHERE idReserva_fac = idReserva_can) AS idRecepcionOnline_fac
      FROM 
        cancelacion_reserva JOIN reserva ON idReserva_res = idReserva_can
      WHERE estado_can = 'P';
    `;
    const rows = await db.executeQuery(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching pending cancellations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCancelacionesByCliente(req, res) {
  try {
    const { id } = req.params;
    const query = `
      SELECT 
        cancelacion_reserva.*, reserva.idCliente_res
      FROM 
        cancelacion_reserva JOIN reserva ON idReserva_res = idReserva_can
      WHERE idCliente_res = ?;
    `;
    const rows = await db.executeQuery(query, [id]);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching cancellations by client:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createCancelacion(req, res) {
  try {
    const { estado_can, idReserva_can } = req.body;
    const query = "CALL Cancelacion_AOE(?,?, ?)";
    await db.executeQuery(query, [0, idReserva_can, estado_can]);
    res.json({ Status: "Cancelacion saved" });
  } catch (error) {
    console.error("Error creating cancellation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateReservaEstado(req, res) {
  try {
    const { idReserva_can, estado_can } = req.body;
    const query = "UPDATE reserva SET estado_res = ? WHERE idReserva_Res = ?";
    await db.executeQuery(query, [estado_can, idReserva_can]);
    res.json({ Status: "Reserva updated" });
  } catch (error) {
    console.error("Error updating reservation state:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateFacturaEstado(req, res) {
  try {
    const { idReserva_can, estado_can } = req.body;
    const query = "UPDATE factura SET Estado_fac = ? WHERE idReserva_fac = ?";
    await db.executeQuery(query, [estado_can, idReserva_can]);
    res.json({ Status: "Factura updated" });
  } catch (error) {
    console.error("Error updating invoice state:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateCancelacion(req, res) {
  try {
    const { idCancelacion_reserva_can, idReserva_can, estado_can } = req.body;
    const query = "CALL Cancelacion_AOE(?, ?, ?)";
    await db.executeQuery(query, [
      idCancelacion_reserva_can,
      idReserva_can,
      estado_can,
    ]);
    res.json({ Status: "Cancelacion updated" });
  } catch (error) {
    console.error("Error updating cancellation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getPendingCancelaciones,
  getCancelacionesByCliente,
  createCancelacion,
  updateReservaEstado,
  updateFacturaEstado,
  updateCancelacion,
};
