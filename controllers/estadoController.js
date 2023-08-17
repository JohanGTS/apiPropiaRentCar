// controllers/estadoController.js
const db = require('../models/db');

function getEstados(req, res) {
    db.query('SELECT * FROM estado', (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}

function getEstadoById(req, res) {
    const { id } = req.params;
    db.query('SELECT * FROM estado WHERE idEstado_est = ?', [id], (err, rows) => {
        if (!err && rows.length > 0) {
            res.json(rows[0]);
        } else if (!err) {
            res.status(404).json({ error: 'Estado not found' });
        } else {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}

function createEstado(req, res) {
    const { idEstado_est, idPais_est, Descripcion_est } = req.body;
    const query = 'CALL Estado_AOE(?, ?, ?)';
    db.query(query, [idEstado_est, idPais_est, Descripcion_est], (err) => {
        if (!err) {
            res.json({ Status: 'Estado saved' });
        } else {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}

function updateEstado(req, res) {
    const { idEstado_est, idPais_est, Descripcion_est } = req.body;
    const query = 'CALL Estado_AOE(?, ?, ?)';
    db.query(query, [idEstado_est, idPais_est, Descripcion_est], (err) => {
        if (!err) {
            res.json({ Status: 'Estado updated' });
        } else {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}

function deleteEstado(req, res) {
    const { id } = req.params;
    db.query('DELETE FROM estado WHERE idEstado_est = ?', [id], (err) => {
        if (!err) {
            res.json({ Status: 'Estado deleted' });
        } else {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}

module.exports = {
    getEstados,
    getEstadoById,
    createEstado,
    updateEstado,
    deleteEstado,
};
