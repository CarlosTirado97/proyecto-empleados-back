const express = require('express');
const app = express();
//CONTROLADOR
const { DepartamentosControlador } = require('../Controladores/DepartamentosControlador');
const departamentosControlador = new DepartamentosControlador();

app.get('/departamentos', departamentosControlador.getDepartamentos);




module.exports = app;