//MODELO BASE
const { ModeloBase } = require('./ModeloBase');

class Departamento extends ModeloBase {

    constructor() {
        super();

        this.id = null;
        this.Descripcion = '';

        this.tabla = 'departamentos';

    }

}

module.exports = { Departamento };