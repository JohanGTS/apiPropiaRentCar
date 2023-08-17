const db = require("../models/db");

async function getReservas(req, res) {
  try {
    const query = `
      SELECT
        r.idReserva_res,
        (
          SELECT Nombre_ter
          FROM tercero t
          WHERE t.idTercero_ter = r.idCliente_res
          LIMIT 1
        ) AS nombreCliente,
        v.Matricula_veh AS matriculaVehiculo,
        r.FechaInicio_res,
        r.FechaFin_res
      FROM reserva r 
      JOIN vehiculo v ON r.idVehiculo_res = v.idVehiculo_veh
      WHERE r.estado_res = 'A'
      GROUP BY r.idReserva_res, v.Matricula_veh, r.FechaInicio_res, r.FechaFin_res;`;

    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching reservas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getReservaById(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM reserva WHERE idReserva_res = ?";
    const rows = await db.executeQuery(query, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Reserva not found" });
    }
  } catch (error) {
    console.error("Error fetching reserva:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createReservaPieza(req, res) {
  try {
    const { idReserva_res, idPieza_pie } = req.body;
    const query =
      'INSERT INTO reserva_piezas (idReserva_rp, idPieza_rp, entregada_rp) VALUES (?, ?, "S")';
    await db.executeQuery(query, [idReserva_res, idPieza_pie]);
    res.json({ Status: "Reserva pieza saved" });
  } catch (error) {
    console.error("Error creating reserva pieza:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateReservaEstado(req, res) {
  try {
    const { idReserva_res, estado_res } = req.body;
    console.log(idReserva_res, estado_res);
    const query = "UPDATE reserva SET estado_res = ? WHERE idReserva_res = ?";
    await db.executeQuery(query, [estado_res, idReserva_res]);
    res.json({ Status: "Reserva estado updated" });
  } catch (error) {
    console.error("Error updating reserva estado:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getReservas,
  getReservaById,
  createReservaPieza,
  updateReservaEstado,
};
