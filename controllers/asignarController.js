const db = require("../models/db");

async function getReservasByFecha(req, res) {
  try {
    const { FechaInicio_res } = req.body;
    const query = `
      SELECT idReserva_res, idPersonal_res, Hora_res, FechaInicio_res,
      (CASE
          WHEN ((SELECT Nombre_ter FROM tercero WHERE idTercero_ter = idPersonal_res) IS NULL)
          THEN 'No asignado'
          ELSE (SELECT Nombre_ter FROM tercero WHERE idTercero_ter = idPersonal_res)
      END) AS Personal
      FROM reserva
      WHERE estado_res = 'A' AND FechaInicio_res > ?;
    `;
    const rows = await db.executeQuery(query, [FechaInicio_res]);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateReservaPersonal(req, res) {
  try {
    const { idPersonal_res } = req.body;
    const { idReserva_res } = req.params;
    const query =
      "UPDATE reserva SET idPersonal_res = ? WHERE idReserva_res = ?";
    await db.executeQuery(query, [idPersonal_res, idReserva_res]);
    res.json({ Status: "Reserva updated" });
  } catch (error) {
    console.error("Error updating reservation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getReservasByFecha,
  updateReservaPersonal,
};
