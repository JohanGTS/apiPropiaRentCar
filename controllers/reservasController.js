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

// Implement other controller functions here

module.exports = {
  pagarConTarjeta,
  getReservasByCliente,
  verificarDisponibilidad,
  verificarDisponibilidadPersonal,
  // Add other functions here
};
