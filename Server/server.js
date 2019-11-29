require('./configuracion');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');

//CORS
app.use(cors({
    origin: 'http://localhost:4200'
}));

//BODY-PARSER
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//RUTAS
app.use(require('./rutas/rutasTodas'));

app.listen(process.env.PORT, (err) => {
    if (err) return console.log(err);

    console.log(`SERVIDOR CORRIENDO EN EL PUERTO: ${process.env.PORT}`);

});