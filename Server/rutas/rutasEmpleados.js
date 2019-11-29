const express = require('express');
const app = express();
//CONTROLADOR
const { EmpleadosControlador } = require('../Controladores/EmpleadosControlador');
const empleadoscontrolador = new EmpleadosControlador();

app.get('/empleados', empleadoscontrolador.getEmpleados);
app.post('/empleados', empleadoscontrolador.insertEmpleado);
app.put('/empleados/:id', empleadoscontrolador.UpdateEmpleado);
app.delete('/empleados/:id', empleadoscontrolador.deleteEmpleado);

module.exports = app;