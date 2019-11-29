const mysql = require('mysql');

const conexion = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'carlos',
    database: 'proyectoempleados'

});

module.exports = conexion;