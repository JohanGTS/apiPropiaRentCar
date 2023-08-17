const db = require("../models/db");
const stripe = require("stripe")(
  "sk_test_51N0m8BFCP7DBw79TOYz3FdUTYNX4byLwYltpeLihnMBVa1y2dswf74x6a258HEMYKNef6P84TqBnkUszvdBmIYX500ESoyaoJf"
); // Add your Stripe secret key here

async function pagarConTarjeta(req, res) {
  let { amount, id, descripcion } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: descripcion,
      payment_method: id,
      confirm: true,
    });
    res.json({
      message: "Pago exitoso",
      id: id,
    });
  } catch (error) {
    console.error("Error:", error);
    res.json({
      message: "Pago fallido",
    });
  }
}

async function getReservasByCliente(req, res) {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM reserva WHERE idCliente_res = ? AND estado_res = 'A';`;
    const data = await db.executeQuery(query, [id]);
    res.json(data);
  } catch (error) {
    console.error("Error fetching reservas by cliente:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function verificarDisponibilidad(req, res) {
  const { inicio, fin, id } = req.body;
  try {
    const query =
      "SELECT verificarDisponibilidad_vehiculos(?, ?, ?) AS estado_veh";
    const data = await db.executeQuery(query, [inicio, fin, id]);
    res.json(data[0]);
  } catch (error) {
    console.error("Error verifying vehicle availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function verificarDisponibilidadPersonal(req, res) {
  const { id, inicio, hora } = req.body;
  try {
    const query =
      "SELECT verificarDisponibilidad_personal(?, ?, ?) AS estado_veh";
    const data = await db.executeQuery(query, [id, inicio, hora]);
    res.json(data[0]);
  } catch (error) {
    console.error("Error verifying personal availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getReserva(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM reserva WHERE idReserva_res = ?";
    const data = await db.executeQuery(query, [id]);
    if (data.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Reserva not found" });
    }
  } catch (error) {
    console.error("Error getting reserva:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function postReserva(req, res) {
  try {
    const {
      idReserva_res,
      idCliente_res,
      FechaInicio_Res,
      FechaFin_Res,
      idVehiculo_res,
      costoPorDia_fac,
      idRecepcionOnline_fac,
      estado_res,
      Nota_Res,
      Hora_res,
      idPersonal_res,
    } = req.body;
    const query = `
    CALL reservarVehiculo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const data = await db.executeQuery(query, [
      idReserva_res,
      idCliente_res,
      FechaInicio_Res,
      FechaFin_Res,
      idVehiculo_res,
      costoPorDia_fac,
      idRecepcionOnline_fac,
      estado_res,
      Nota_Res,
      Hora_res,
      idPersonal_res,
    ]);
    res.json({ Status: "Reserva updated" });
  } catch (error) {
    console.error("Error updating reserva:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function postReserva(req, res) {
  try {
    const {
      idReserva_res,
      idCliente_res,
      FechaInicio_Res,
      FechaFin_Res,
      idVehiculo_res,
      costoPorDia_fac,
      idRecepcionOnline_fac,
      estado_res,
      Nota_Res,
      Hora_res,
      idPersonal_res,
    } = req.body;
    const query = `
    CALL reservarVehiculo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;
    const data = await db.executeQuery(query, [
      idReserva_res,
      idCliente_res,
      FechaInicio_Res,
      FechaFin_Res,
      idVehiculo_res,
      costoPorDia_fac,
      idRecepcionOnline_fac,
      estado_res,
      Nota_Res,
      Hora_res,
      idPersonal_res,
    ]);
    res.json({ Status: "Reserva updated" });
  } catch (error) {
    console.error("Error updating reserva:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function putReserva(req, res) {
  try {
    const {
      idCliente_res,
      FechaInicio_Res,
      FechaFin_Res,
      idVehiculo_res,
      costoPorDia_fac,
      idRecepcionOnline_fac,
      estado_res,
      Nota_Res,
      Hora_res,
    } = req.body;
    const { idReserva_res } = req.params;
    const query = `
    CALL reservarVehiculo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;
    const data = await db.executeQuery(query, [
      idReserva_res,
      idCliente_res,
      FechaInicio_Res,
      FechaFin_Res,
      idVehiculo_res,
      costoPorDia_fac,
      idRecepcionOnline_fac,
      estado_res,
      Nota_Res,
      Hora_res,
    ]);
    res.json({ Status: "Reserva updated" });
  } catch (error) {
    console.error("Error updating reserva:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteReserva(req, res) {
  try {
    const { id } = req.params;
    const query = "DELETE FROM reserva WHERE idReserva_res = ?";
    res.json({ Status: "Reserva deleted" });
  } catch (error) {
    console.error("Error deleting reserva:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  pagarConTarjeta,
  getReservasByCliente,
  verificarDisponibilidad,
  verificarDisponibilidadPersonal,
  postReserva,
  putReserva,
  deleteReserva,
};
