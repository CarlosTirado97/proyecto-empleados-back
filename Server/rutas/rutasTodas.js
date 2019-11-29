const express = require('express');
const app = express();


app.use(require('./rutasEmpleados'));
app.use(require('./rutasDepartamentos'));



module.exports = app;