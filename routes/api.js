// routes/api.js
const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const coloresController = require("../controllers/coloresController");
const actividadController = require("../controllers/actividadController");
const componentesController = require("../controllers/componentesController");
const regionController = require("../controllers/regionController");
const unidadController = require("../controllers/unidadesController");
const categoriaController = require("../controllers/categoriaController");
const cancelacionController = require("../controllers/cancelacionController");
const asignarController = require("../controllers/asignarController");
const combustibleController = require("../controllers/combustibleController");
const dashboardController = require("../controllers/dashboardController");
const documentoController = require("../controllers/documentoController");
const entregaController = require("../controllers/entregaController");
const marcaController = require("../controllers/marcaController");
const modeloController = require("../controllers/modeloController");
const usuariosController = require("../controllers/personalController"); // Importa el controlador de usuarios
const piezasController = require("../controllers/piezaController"); // Importa el controlador de piezas
const recibirController = require("../controllers/recibirController"); // Importa el controlador de reservas
const reservasController = require("../controllers/reservasController"); // Importa el controlador de reservas
const segurosController = require("../controllers/segurosController"); // Importa el controlador de seguros
const tipousuarioController = require("../controllers/tipousuarioController"); // Importa el controlador de tipos de usuarios
const tipovehiculoController = require("../controllers/tipovehiculoController"); // Importa el controlador de tipos de vehículos
const vehiculoController = require("../controllers/vehiculoController"); // Importa el controlador de vehículos

router.get("/data", dataController.getData);

//colores
router.get("/color", coloresController.getColores);
router.get("/color/:id", coloresController.getColoresById);
router.post("/color", coloresController.createColor);
router.put("/color/:idColor_col", coloresController.updateColor);
router.delete("/color/:id", coloresController.deleteColor);

//asignar
router.post("/asignar", asignarController.getReservasByFecha);
router.put("/asignar/:idReserva_res", asignarController.updateReservaPersonal);

//cancelaciones
router.get("/cancelacion", cancelacionController.getPendingCancelaciones);
router.get("/cancelacion/:id", cancelacionController.getCancelacionesByCliente);
router.post("/cancelacion", cancelacionController.createCancelacion);
router.put(
  "/cancelacion/reserva/:idCancelacion_reserva_can",
  cancelacionController.updateReservaEstado
);
router.put(
  "/cancelacion/factura/:idCancelacion_reserva_can",
  cancelacionController.updateFacturaEstado
);
router.put(
  "/cancelacion/:idCancelacion_reserva_can",
  cancelacionController.updateCancelacion
);

//combustible
router.get("/combustible", combustibleController.getCombustibles);
router.get("/combustible/:id", combustibleController.getCombustibleById);
router.post("/combustible", combustibleController.createCombustible);
router.put(
  "/combustible/:idCombustible_com",
  combustibleController.updateCombustible
);
router.delete("/combustible/:id", combustibleController.deleteCombustible);

//dashboard/;
router.get(
  "/dashboard/ultimasReservas",
  dashboardController.getUltimasReservas
);
router.post(
  "/dashboard/ultimasReservasDashboard",
  dashboardController.getUltimasReservasDashboard
);

router.post(
  "/dashboard/reservasXempleado",
  dashboardController.getReservasXempleado
);

router.post(
  "/dashboard/reservasXempleado",
  dashboardController.getReservasXempleado
);

router.post("/dashboard/reservasAHacer", dashboardController.getReservasAHacer);
router.get(
  "/dashboard/facturasActivas/:id",
  dashboardController.getUltimasReservasById
);
router.get(
  "/dashboard/facturasActivas",
  dashboardController.getFacturasActivas
);
router.get(
  "/dashboard/OrdenxCliente/:id",
  dashboardController.getOrdenxCliente
);
router.get(
  "/dashboard/clienteFrecuente",
  dashboardController.getClienteFrecuente
);
router.get(
  "/dashboard/vehiculoFrecuente",
  dashboardController.getVehiculoFrecuente
);
router.get("/dashboard/dashboard", dashboardController.getDashboard);
router.get(
  "/dashboard/cantVehiculoRentado",
  dashboardController.getCantVehiculoRentado
);
router.get("/dashboard/cant_cliveh", dashboardController.getCantidadClientes);

//documento
router.get("/documento", documentoController.getDocumentos);
router.get("/documento/:id", documentoController.getDocumentoById);
router.post("/documento", documentoController.createDocumento);
router.put("/documento/:idDocumento_doc", documentoController.updateDocumento);
router.delete("/documento/:id", documentoController.deleteDocumento);

//entrega
router.get("/entrega", entregaController.getReservas);
router.get("/entrega/:id", entregaController.getReservaById);
router.post("/entrega", entregaController.createReservaPieza);
router.put(
  "/entrega/reserva/:idReserva_res",
  entregaController.updateReservaEstado
);

//marca
router.get("/marca", marcaController.getMarcas);
router.get("/marca/:id", marcaController.getMarcaById);
router.post("/marca", marcaController.createMarca);
router.put("/marca/:idMarca_mar", marcaController.updateMarca);
router.delete("/marca/:id", marcaController.deleteMarca);

//modelo
router.get("/modelo", modeloController.getModelos);
router.get("/modelo/:id", modeloController.getModeloById);
router.post("/modelo", modeloController.createModelo);
router.put("/modelo/:idModelo_mod", modeloController.updateModelo);
router.delete("/modelo/:id", modeloController.deleteModelo);

//personal
router.post("/personal/getusuario", usuariosController.getCredenciaUsuario); // Usa la función del controlador para obtener usuario

router.put(
  "/personal/usuario/:idTercero_ter",
  usuariosController.updateUsuario
); // Usa la función del controlador para actualizar usuario

router.post("/personal/usuario", usuariosController.createUsuario); // Usa la función del controlador para crear usuario

router.get("/personal/usuario", usuariosController.getUsuarios); // Usa la función del controlador para obtener todos los usuarios

router.get(
  "/personal/usuario/:Nombre_usu",
  usuariosController.getUsuarioByNombre
); // Usa la función del controlador para obtener usuario por nombre

router.get("/personal/Cliente", usuariosController.getUsuarios); // Usa la función del controlador para obtener clientes

router.get("/personal/Cliente/:id", usuariosController.getUsuariosById); // Usa la función del controlador para obtener cliente por ID

router.post("/personal/Cliente", usuariosController.createUsuarioCliente); // Usa la función del controlador para crear cliente

router.put(
  "/personal/Cliente/:idTercero_ter",
  usuariosController.updateUsuario
); // Usa la función del controlador para actualizar cliente

router.delete("/personal/Cliente/:id", usuariosController.deleteUsuario); // Usa la función del controlador para eliminar cliente

router.get("/personal/Empleado", usuariosController.getUsuariosPersonal); // Usa la función del controlador para obtener empleados

router.get("/personal/", usuariosController.getUsuariosPersonal); // Usa la función del controlador para obtener empleados

router.get(
  "/personal/Empleado/:id",
  usuariosController.getUsuariosEmpleadoById
); // Usa la función del controlador para obtener empleado por ID

//pieza

router.get("/pieza/", piezasController.getPiezas); // Usa la función del controlador para obtener todas las piezas

router.get("/pieza/:id", piezasController.getPiezaById); // Usa la función del controlador para obtener pieza por ID

router.post("/pieza/", piezasController.createPieza); // Usa la función del controlador para crear pieza

router.put("/pieza/:idPieza_pie", piezasController.updatePieza); // Usa la función del controlador para actualizar pieza

router.delete("/pieza/:id", piezasController.deletePieza); // Usa la función del controlador para eliminar pieza

//recibir
router.get("/recibir/", recibirController.getReservas); // Usa la función del controlador para obtener las reservas

router.get("/recibir/pieza/:id", recibirController.getPiezasByReserva); // Usa la función del controlador para obtener piezas por reserva

router.post("/recibir/", recibirController.entregarPieza); // Usa la función del controlador para entregar pieza

router.put(
  "/recibir/reserva/:idReserva_res",
  recibirController.actualizarEstadoReserva
); // Usa la función del controlador para actualizar el estado de reserva

router.delete("/recibir/", recibirController.eliminarPiezaDeReserva); // Usa la función del controlador para eliminar pieza de reserva

//reserva

router.post("/reserva/pagoTarjeta", reservasController.pagarConTarjeta); // Usa la función del controlador para procesar pagos con tarjeta

router.get("/reserva/cliente/:id", reservasController.getReservasByCliente); // Usa la función del controlador para obtener reservas por cliente

router.post("/reserva/disponible", reservasController.verificarDisponibilidad); // Usa la función del controlador para verificar disponibilidad de vehículos

router.post(
  "/reserva/disponiblePersonal",
  reservasController.verificarDisponibilidadPersonal
); // Usa la función del controlador para verificar disponibilidad de personal

router.post("/reserva/", reservasController.postReserva);
router.put("/reserva/:idReserva_res", reservasController.putReserva);
router.delete("/reserva/:idReserva_res", reservasController.deleteReserva);

//seguros
router.get("/seguro/", segurosController.getSeguros); // Usa la función del controlador para obtener todos los seguros

router.get("/seguro/:id", segurosController.getSeguroById); // Usa la función del controlador para obtener un seguro por su ID

router.post("/seguro/", segurosController.createSeguro); // Usa la función del controlador para crear un nuevo seguro

router.put("/seguro/:idSeguro_seg", segurosController.updateSeguro); // Usa la función del controlador para actualizar un seguro por su ID

router.delete("/seguro/:id", segurosController.deleteSeguro); // Usa la función del controlador para eliminar un seguro por su ID

//tipoUsuario
router.get("/tipoUsuario/", tipousuarioController.getTiposUsuario); // Usa la función del controlador para obtener todos los tipos de usuarios

router.get("/tipoUsuario/:id", tipousuarioController.getTipoUsuarioById); // Usa la función del controlador para obtener un tipo de usuario por su ID

router.post("/tipoUsuario/", tipousuarioController.createTipoUsuario); // Usa la función del controlador para crear un nuevo tipo de usuario

router.put(
  "/tipoUsuario/:idTipoUsuario_tipusu",
  tipousuarioController.updateTipoUsuario
); // Usa la función del controlador para actualizar un tipo de usuario por su ID

router.delete("/tipoUsuario/:id", tipousuarioController.deleteTipoUsuario); // Usa la función del controlador para eliminar un tipo de usuario por su ID

//tipoVehiculo
router.get("/tipoVehiculo/", tipovehiculoController.getTiposVehiculo); // Usa la función del controlador para obtener todos los tipos de vehículos

router.get("/tipoVehiculo/:id", tipovehiculoController.getTipoVehiculoById); // Usa la función del controlador para obtener un tipo de vehículo por su ID

router.post("/tipoVehiculo/", tipovehiculoController.createTipoVehiculo); // Usa la función del controlador para crear un nuevo tipo de vehículo

router.put(
  "/tipoVehiculo/:idTipoVehiculo_tipveh",
  tipovehiculoController.updateTipoVehiculo
); // Usa la función del controlador para actualizar un tipo de vehículo por su ID

router.delete("/tipoVehiculo/:id", tipovehiculoController.deleteTipoVehiculo); // Usa la función del controlador para eliminar un tipo de vehículo por su ID

//vehiculos
router.post("/vehiculo/upload", vehiculoController.uploadImage); // Subir imagen

router.get("/vehiculo/image", vehiculoController.getImages); // Obtener imágenes

router.get("/vehiculo/", vehiculoController.getVehicles); // Obtener vehículos

router.get("/vehiculo/vehiculo", vehiculoController.getVehiculo); // Obtener vehículos

router.get("/vehiculo/segregado/", vehiculoController.getVehiculoSegregado); // Obtener vehículos segregados

router.get("/vehiculo/:id", vehiculoController.getVehicleById); // Obtener un vehículo por su ID

router.post("/vehiculo/", vehiculoController.createVehicle); // Crear un nuevo vehículo

router.put("/vehiculo/:idVehiculo_veh", vehiculoController.updateVehicle); // Actualizar un vehículo por su ID

router.delete("/vehiculo/:id", vehiculoController.deleteVehicle); // Eliminar un vehículo por su ID
router.post("/vehiculo/segregacion", vehiculoController.segregacion); // Usa la función del controlador para verificar disponibilidad de vehículos
router.get("/vehiculo/componente/:id",vehiculoController.getComponentsVehicleById)

//actividad
router.get("/actividad", actividadController.getActividades); // Obtener vehículos

router.get("/actividad/:id", actividadController.getActividadesById); // Obtener un vehículo por su ID

// componentes
router.get("/componente", componentesController.getComponentes); // Obtener vehículos

router.get("/componente/:id", componentesController.getComponentesById); // Obtener un vehículo por su ID

//region
router.get("/region", regionController.getRegiones); // Obtener vehículos

router.get("/region/:id", regionController.getRegionesById); // Obtener un vehículo por su ID

//unidad
router.get("/unidad", unidadController.getUnidades); // Obtener vehículos

router.get("/unidad/:id", unidadController.getUnidadesById); // Obtener un vehículo por su ID

//categoria
router.get("/categoria", categoriaController.getCategorias); // Obtener vehículos

router.get("/categoria/:id", categoriaController.getCategoriasById); // Obtener un vehículo por su ID

module.exports = router;
