//CONEXION
const conexion = require('./Conexion');

class ModeloBase {

    constructor() {
        this.tabla = '';
    }

    static select() {

        return new Promise((resolve, reject) => {

            let instancia = new this();

            conexion.query(`SELECT * FROM ${instancia.tabla}`, (err, res) => {

                if (err) return reject([500, err]);

                resolve(res);

            });

        });

    }

    static selectById(id) {
        return new Promise((resolve, reject) => {

            let instancia = new this();
            conexion.query(`SELECT * FROM ${instancia.tabla} WHERE id = ?`, [id], (err, res) => {

                if (err) return reject([500, err]);

                if (res.length == 0) {
                    return reject([500, `No existe un registro con la id: ${id} en la tabla: ${instancia.tabla}`]);
                }

                instancia = new this(res[0]);
                instancia.id = res[0].id;

                resolve(instancia);
            });
        });
    }

    insert() {
        return new Promise((resolve, reject) => {

            let nombreCampos = Object.getOwnPropertyNames(this).filter((propiedad) => {
                return propiedad != 'id' && propiedad != 'tabla';
            });

            let valores = [];
            let bindCampos = [];
            for (let x = 0; x < nombreCampos.length; x++) {
                valores[x] = this[nombreCampos[x]];
                bindCampos[x] = '?';
            }
            bindCampos = bindCampos.join(',');

            conexion.query(`INSERT INTO ${this.tabla} (${nombreCampos.join(',')})VALUES (${bindCampos})`, valores, (err, res) => {

                if (err) {
                    console.log(err);
                    return reject([500, err]);
                }

                resolve(res);

            });

        });
    }

    update() {
        return new Promise((resolve, reject) => {

            let nombreCampos = Object.getOwnPropertyNames(this).filter((propiedad) => {
                return propiedad != 'id' && propiedad != 'tabla';
            });

            let valores = [];
            let bindCampos = [];
            for (let x = 0; x < nombreCampos.length; x++) {
                valores[x] = this[nombreCampos[x]];
                bindCampos[x] = `${nombreCampos[x]} = ? `;
            }

            valores[valores.length] = this.id;
            bindCampos = bindCampos.join(',');

            conexion.query(`UPDATE ${this.tabla} SET ${bindCampos} WHERE id = ?`, valores, (err, res) => {

                if (err) return reject(err);

                resolve(res);

            });

        });
    }

    delete() {
        return new Promise((resolve, reject) => {

            conexion.query(`DELETE FROM ${this.tabla} WHERE id = ?`, [this.id], (err, res) => {

                if (err) return reject([500, err]);

                resolve(res);

            });
        });
    }


}

module.exports = { ModeloBase };