//MODELO BASE
const { ModeloBase } = require('./ModeloBase');
//CONEXION
const conexion = require('./Conexion');

class Empleado extends ModeloBase {

    constructor(obj = { Nombre: null, ApPaterno: null, ApMaterno: null, FecNac: null, Departamento: null, Sueldo: null }) {
        super();

        this.id = null;
        this.Nombre = obj.Nombre || '';
        this.ApPaterno = obj.ApPaterno || '';
        this.ApMaterno = obj.ApMaterno || '';
        this.FecNac = obj.FecNac || '';
        this.Departamento = obj.Departamento || '';
        this.Sueldo = obj.Sueldo || '';

        this.tabla = 'empleados';
    }

    static async select() {

        return new Promise((resolve, reject) => {

            conexion.query(`SELECT empleados.*,departamentos.Descripcion FROM empleados INNER JOIN (departamentos) ON (departamentos.id = empleados.Departamento)`, (err, empleados) => {

                if (err) return reject([500, err]);

                resolve(empleados);
            });
        });

    }

}

module.exports = { Empleado };