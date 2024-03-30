const db = require("../models/db");
const multer = require("multer");

const rutaImagen = `C:/Users/Johan/Desktop/PruebLocalProyecti/rentCarProyectoFinal/src/assets/images`;
const fileUpload = multer({
  storage: multer.diskStorage({
    destination: rutaImagen,
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-rentacar-" + file.originalname);
    },
  }),
}).single("image");

async function uploadImage(req, res) {
  try {
    fileUpload(req, res, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al subir la imagen" });
      }
      const image = req.file.filename;
      const { vehiculo } = req.body;
      const sql =
        "UPDATE vehiculo_galeria Set Imagen_vehgal = ? where idVehiculo_vehgal = ?";
      db.executeQuery(sql, [image, vehiculo], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error" });
        }
        return res.json({ status: "Success" });
      });
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getVehiculoSegregado(req, res) {
  try {
    console.log(res);
    const { categoria, actividad, region, componente } = req.body;
    //const { categoria, actividad, region, componente } = req.params;
    console.log(req);

    const query =
      "SELECT * FROM vista_vehiculo WHERE FIND_IN_SET(idVehiculo_veh, funcion_segregarVehiculos(" +
      categoria +
      ", " +
      actividad +
      ", " +
      region +
      ", " +
      componente +
      "));";

    //"SELECT * FROM vista_vehiculo WHERE FIND_IN_SET(idVehiculo_veh, funcion_segregarVehiculos( '1', '', '', ''));";
    //"SELECT * FROM vista_vehiculo WHERE FIND_IN_SET(idVehiculo_veh, funcion_segregarVehiculos( ?, ?, ?, ?));";
    const rows = await db.executeQuery(query, [
      categoria,
      actividad,
      region,
      componente,
    ]);
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ error: "Vehículo no encontrado" });
    }
  } catch (error) {
    //console.error("Error fetching vehicle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function segregacion(req, res) {
  const { categoria, actividad, region, componente } = req.body;
  console.log(req.body);
  try {
    const query = "call sp_segregacion(?, ?, ?,?) ";
    const data = await db.executeQuery(query, [
      categoria,
      actividad,
      region,
      componente,
    ]);
    res.json(data);
  } catch (error) {
    console.error("Error verifying vehicle availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function getVehiculo(req, res) {
  try {
    const sql = "SELECT * FROM vista_vehiculo";
    const rows = await db.executeQuery(sql);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getImages(req, res) {
  try {
    const sql = "SELECT * FROM vehiculo_galeria";
    const rows = await db.executeQuery(sql);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getVehicles(req, res) {
  try {
    const query = `
      SELECT idVehiculo_veh, Matricula_veh, Chasis_veh, idTipoVehiculo_veh, idMarca_veh,
      idModelo_veh, idColor_veh, idSeguro_veh, Transmision_veh, Año_veh,
      CantidadAsiento_veh, CostoPorDia_veh, idCombustible_veh FROM vehiculo
    `;
    const rows = await db.executeQuery(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getVehicleById(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM vehiculo WHERE idVehiculo_veh = ?";
    const rows = await db.executeQuery(query, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Vehículo no encontrado" });
    }
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getComponentsVehicleById(req, res) {
  try {
    const { id } = req.params;
    const query =
      "SELECT * FROM componente_vehiculo WHERE idvehiculo_vcmp = ?";
    const rows = await db.executeQuery(query, [id]);

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ error: "Componentes no encontrados" });
    }
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createVehicle(req, res) {
  try {
    const {
      idVehiculo_veh,
      idTipoVehiculo_veh,
      idMarca_veh,
      idModelo_veh,
      Transmision_veh,
      Año_veh,
      CantidadAsiento_veh,
      Matricula_veh,
      idColor_veh,
      idSeguro_veh,
      CostoPorDia_veh,
      Chasis_veh,
      idCombustible_veh,
    } = req.body;
    const query = "CALL Vehiculo_AOE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    await db.executeQuery(query, [
      idVehiculo_veh,
      idTipoVehiculo_veh,
      idMarca_veh,
      idModelo_veh,
      Transmision_veh,
      Año_veh,
      CantidadAsiento_veh,
      Matricula_veh,
      1,
      idColor_veh,
      idSeguro_veh,
      CostoPorDia_veh,
      Chasis_veh,
      idCombustible_veh,
    ]);
    res.json({ Status: "Vehículo guardado" });
  } catch (error) {
    console.error("Error creating vehicle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateVehicle(req, res) {
  try {
    const {
      idTipoVehiculo_veh,
      idMarca_veh,
      idModelo_veh,
      Transmision_veh,
      Año_veh,
      CantidadAsiento_veh,
      Matricula_veh,
      idColor_veh,
      idSeguro_veh,
      CostoPorDia_veh,
      Chasis_veh,
      idCombustible_veh,
    } = req.body;
    const { idVehiculo_veh } = req.params;
    const query = "CALL Vehiculo_AOE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    await db.executeQuery(query, [
      idVehiculo_veh,
      idTipoVehiculo_veh,
      idMarca_veh,
      idModelo_veh,
      Transmision_veh,
      Año_veh,
      CantidadAsiento_veh,
      Matricula_veh,
      1,
      idColor_veh,
      idSeguro_veh,
      CostoPorDia_veh,
      Chasis_veh,
      idCombustible_veh,
    ]);
    res.json({ Status: "Vehículo actualizado" });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteVehicle(req, res) {
  try {
    const { id } = req.params;
    await db.executeQuery("CALL Vehiculo_DEL(?)", [id]);
    res.json({ Status: "Vehículo eliminado" });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  uploadImage,
  getImages,
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehiculo,
  segregacion,
  getVehiculoSegregado,
  getComponentsVehicleById,
};
