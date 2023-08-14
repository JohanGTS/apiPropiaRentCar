const db = require("../models/db");

async function getUltimasReservas(req, res) {
  try {
    const query = "SELECT * FROM ordenesrecientes";
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching últimas reservas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getDashboard(req, res) {
  try {
    const query = `select distinct (select count(idReserva_res) from reserva where estado_res ='A' or estado_res = 'F') as reservas, (select count(idUsuario_usu) from usuario where idTipoUsuario_usu=3)as usuarios, 
    (select count(idVehiculo_veh) from vehiculo) as vehiculo,
    (SELECT SUM(montoTotal_Fac) AS total FROM factura WHERE Estado_fac <> 'C' )as total from reserva 
      `;
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching últimas reservas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCantVehiculoRentado(req, res) {
  try {
    const query =
      "select Vehiculo,count(Vehiculo) cantidad from cantvehiculorentado group by Vehiculo ";
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching últimas reservas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCantidadClientes(req, res) {
  try {
    const query = `SELECT
    DATE_FORMAT(FechaRegistro_cli, '%Y-%m') AS MesCliente,
    COUNT(idCliente_cli) AS CantidadNuevosClientes,
    COUNT(idVehiculo_veh) AS CantidadNuevosVehiculos
FROM
    cliente
LEFT JOIN
    vehiculo ON DATE_FORMAT(cliente.FechaRegistro_cli, '%Y-%m') = DATE_FORMAT(vehiculo.FechaRegistro_veh, '%Y-%m')
GROUP BY
    MesCliente
ORDER BY
    MesCliente`;
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching últimas reservas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getDashboard(req, res) {
  try {
    const query = `select distinct (select count(idReserva_res) from reserva where estado_res ='A' or estado_res = 'F') as reservas, (select count(idUsuario_usu) from usuario where idTipoUsuario_usu=3)as usuarios, 
    (select count(idVehiculo_veh) from vehiculo) as vehiculo,
    (SELECT SUM(montoTotal_Fac) AS total FROM factura WHERE Estado_fac <> 'C' )as total from reserva 
      `;
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching últimas reservas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getVehiculoFrecuente(req, res) {
  try {
    const query = "SELECT * FROM vehiculosrentados";
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching últimas reservas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getClienteFrecuente(req, res) {
  try {
    const query = "SELECT * FROM clientefrecuente";
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching últimas reservas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getOrdenxCliente(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM ordenesrecientes where idCliente_res = ?";
    const data = await db.executeQuery(query, [id]);
    res.json(data);
  } catch (error) {
    console.error("Error fetching últimas reservas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getUltimasReservasById(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM facturasactivas where idCliente_res = ?";
    const data = await db.executeQuery(query, [id]);
    res.json(data);
  } catch (error) {
    console.error("Error fetching últimas reservas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getFacturasActivas(req, res) {
  try {
    const query = "SELECT * FROM ordenesrecientes";
    const data = await db.executeQuery(query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching últimas reservas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getReservasXempleado(req, res) {
  try {
    const { FechaInicio_res, idPersonal_res } = req.body;
    const query =
      "SELECT * FROM vista_reservas_por_dia_y_personal WHERE FechaInicio_res = ? AND idPersonal_res = ?;";
    const data = await db.executeQuery(query, [
      FechaInicio_res,
      idPersonal_res,
    ]);
    res.json(data);
  } catch (error) {
    console.error("Error fetching últimas reservas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getReservasAHacer(req, res) {
  try {
    const { FechaInicio_res } = req.body;
    const query =
      "SELECT * FROM vista_reservas_por_dia_y_personal WHERE FechaInicio_res > ?";
    const rows = await db.executeQuery(query, [FechaInicio_res]);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching últimas reservas for dashboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getUltimasReservasDashboard(req, res) {
  try {
    const { FechaCreacion_res } = req.body;
    const query = "SELECT * FROM ordenesrecientes WHERE FechaCreacion_res = ?";
    const rows = await db.executeQuery(query, [FechaCreacion_res]);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching últimas reservas for dashboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getUltimasReservas,
  getUltimasReservasDashboard,
  getDashboard,
  getVehiculoFrecuente,
  getClienteFrecuente,
  getOrdenxCliente,
  getUltimasReservasById,
  getFacturasActivas,
  getReservasXempleado,
  getReservasAHacer,
  getCantVehiculoRentado,
  getCantidadClientes,
};
