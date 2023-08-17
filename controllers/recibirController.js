const db = require("../models/db");

async function getReservas(req, res) {
  try {
    const query = `
      SELECT
          rp.idReserva_rp,
          (
            SELECT Nombre_ter
            FROM tercero t
            WHERE t.idTercero_ter = r.idCliente_res
            LIMIT 1
          ) AS nombreCliente,
          v.Matricula_veh AS matriculaVehiculo,
          r.FechaInicio_res,
          r.FechaFin_res
      FROM reserva_piezas rp
      JOIN reserva r ON rp.idReserva_rp = r.idReserva_res
      JOIN vehiculo v ON r.idVehiculo_res = v.idVehiculo_veh
      WHERE r.estado_res = 'E'
      GROUP BY rp.idReserva_rp, v.Matricula_veh, r.FechaInicio_res, r.FechaFin_res;
      `;
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching reservas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getPiezasByReserva(req, res) {
  try {
    const { id } = req.params;
    const query = `
      SELECT 
          rp.idPieza_rp, 
          p.Descripcion_pie  
      FROM 
          reserva_piezas rp
      JOIN 
          pieza p ON rp.idPieza_rp = p.idPieza_pie 
      WHERE rp.idReserva_rp = ?;
      `;
    const data = await db.executeQuery(query, [id]);
    res.json(data);
  } catch (error) {
    console.error("Error fetching piezas by reserva:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function entregarPieza(req, res) {
  try {
    const { idReserva_res, idPieza_pie } = req.body;
    const query = `
      DELETE FROM reserva_piezas WHERE idReserva_rp = ? AND idPieza_rp = ?;
      `;
    await db.executeQuery(query, [idReserva_res, idPieza_pie]);
    res.json({ Status: "Pieza entregada" });
  } catch (error) {
    console.error("Error delivering pieza:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function actualizarEstadoReserva(req, res) {
  try {
    const { idReserva_rp, estado_res } = req.body;
    const query = `
      UPDATE reserva SET estado_res = ? WHERE idReserva_res = ?;
      `;
    await db.executeQuery(query, [estado_res, idReserva_rp]);
    res.json({ Status: "Reserva updated" });
  } catch (error) {
    console.error("Error updating reserva:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function eliminarPiezaDeReserva(req, res) {
  try {
    const { idReserva_rp, idPieza_rp } = req.body;
    const result = await db.executeQuery(
      "DELETE FROM reserva_piezas WHERE idReserva_rp = ? AND idPieza_rp = ?",
      [idReserva_rp, idPieza_rp]
    );
    if (result.affectedRows > 0) {
      res.json({ Status: "Entry Deleted" });
    } else {
      res.json({ Status: "No Entry Found with given keys" });
    }
  } catch (error) {
    console.error("Error deleting pieza from reserva:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getReservas,
  getPiezasByReserva,
  entregarPieza,
  actualizarEstadoReserva,
  eliminarPiezaDeReserva,
};
