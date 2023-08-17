const db = require("../models/db");

async function getOrdenXCleint(req, res) {
  try {
    const { id } = req.params;
    const query = "call OrdenesxCliente(?)";
    const rows = await db.executeQuery(query, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Orden not found" });
    }
  } catch (error) {
    console.error("Error fetching Orden:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCredenciaUsuario(req, res) {
  try {
    const { usuario, pass } = req.body;
    const query = "call returnUser(?, ?)";
    const rows = await db.executeQuery(query, [usuario, pass]);

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching user credentials:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getUsuarios(req, res) {
  try {
    const query = "SELECT * FROM cliente_show";
    const rows = await db.executeQuery(query);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching usuarios:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getUsuariosPersonal(req, res) {
  try {
    const query = "SELECT * FROM personal_show";
    const rows = await db.executeQuery(query);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching personal usuarios:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getUsuariosById(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM cliente_show where Codigo=?";
    const rows = await db.executeQuery(query, [id]);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching usuario by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getUsuariosEmpleadoById(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM personal_show where Codigo=?";
    const rows = await db.executeQuery(query, [id]);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching employee usuario by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getUsuarioByNombre(req, res) {
  try {
    const { Nombre_usu } = req.params;
    const query =
      "SELECT lower(Nombre_usu) as Nombre_usu FROM usuario WHERE Nombre_usu = ?";
    const rows = await db.executeQuery(query, [Nombre_usu]);

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching usuario by nombre:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createUsuario(req, res) {
  try {
    const {
      idTercero_ter,
      Nombre_ter,
      Telefono_ter,
      idDocumento_ter,
      Documento_ter,
      Fecha_Nacimiento_ter,
      Correo_ter,
      idTipoUsuario_usu,
      Nombre_usu,
      Clave_usu,
      Estado_usu,
      Especificacion_terdir,
    } = req.body;
    const query = "CALL Personal_AOE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    await db.executeQuery(query, [
      idTercero_ter,
      Nombre_ter,
      Telefono_ter,
      idDocumento_ter,
      Documento_ter,
      Fecha_Nacimiento_ter,
      Correo_ter,
      idTipoUsuario_usu,
      Nombre_usu,
      Clave_usu,
      1,
      Especificacion_terdir,
    ]);

    res.json({ Status: "Usuario saved" });
  } catch (error) {
    console.error("Error creating usuario:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createUsuarioCliente(req, res) {
  try {
    const {
      idTercero_ter,
      Nombre_ter,
      Telefono_ter,
      idDocumento_ter,
      Documento_ter,
      Fecha_Nacimiento_ter,
      Correo_ter,
      Nombre_usu,
      Clave_usu,
      Especificacion_terdir,
    } = req.body;
    const query = "CALL Personal_AOE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    await db.executeQuery(query, [
      idTercero_ter,
      Nombre_ter,
      Telefono_ter,
      idDocumento_ter,
      Documento_ter,
      Fecha_Nacimiento_ter,
      Correo_ter,
      3,
      Nombre_usu,
      Clave_usu,
      1,
      Especificacion_terdir,
    ]);

    res.json({ Status: "Usuario saved" });
  } catch (error) {
    console.error("Error creating cliente usuario:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateUsuario(req, res) {
  try {
    const {
      Nombre_ter,
      Telefono_ter,
      idDocumento_ter,
      Documento_ter,
      Fecha_Nacimiento_ter,
      Correo_ter,
      idTipoUsuario_usu,
      Nombre_usu,
      Clave_usu,
      Estado_usu,
      Especificacion_terdir,
    } = req.body;
    const { idTercero_ter } = req.params;
    const query = "CALL Personal_AOE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    await db.executeQuery(query, [
      idTercero_ter,
      Nombre_ter,
      Telefono_ter,
      idDocumento_ter,
      Documento_ter,
      Fecha_Nacimiento_ter,
      Correo_ter,
      idTipoUsuario_usu,
      Nombre_usu,
      Clave_usu,
      1,
      Especificacion_terdir,
    ]);

    res.json({ Status: "Usuario updated" });
  } catch (error) {
    console.error("Error updating usuario:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteUsuario(req, res) {
  try {
    const { id } = req.params;
    await db.executeQuery("CALL Personal_DEL(?)", [id]);

    res.json({ Status: "Usuario deleted" });
  } catch (error) {
    console.error("Error deleting usuario:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getUsuariosEmpleadoById,
  getOrdenXCleint,
  getCredenciaUsuario,
  getUsuarios,
  getUsuariosPersonal,
  getUsuariosById,
  getUsuariosEmpleadoById,
  getUsuarioByNombre,
  createUsuario,
  createUsuarioCliente,
  updateUsuario,
  deleteUsuario,
};
