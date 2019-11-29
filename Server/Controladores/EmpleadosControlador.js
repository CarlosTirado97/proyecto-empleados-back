//MODELO
const { Empleado } = require('../Modelos/Empleado');
//VALIDACIONES
const { Validaciones } = require('../Validaciones/Validaciones');

class EmpleadosControlador {

    async getEmpleados(req, res) {

        try {
            let empleados = await Empleado.select();

            res.json({
                empleados
            });

        } catch (err) {

            if (Array.isArray(err)) {
                console.log(err);
                res.status(err[0]).json({
                    err: err[1]
                });
            } else {
                console.log(err);
                res.json({
                    err
                });
            }

        }

    }
    async insertEmpleado(req, res) {

        console.log('hola')
        try {

            let bodyEsperado = [
                { campo: 'Nombre', required: true },
                { campo: 'ApPaterno', required: true },
                { campo: 'ApMaterno', required: true },
                { campo: 'FecNac', required: true },
                { campo: 'Departamento', required: true },
                { campo: 'Sueldo', required: true },
            ];


            await Validaciones.validarBody(req.body, bodyEsperado);

            let empleado = new Empleado();

            empleado.Nombre = req.body.Nombre;
            empleado.ApPaterno = req.body.ApPaterno;
            empleado.ApMaterno = req.body.ApMaterno;
            empleado.FecNac = req.body.FecNac;
            empleado.Departamento = req.body.Departamento;
            empleado.Sueldo = req.body.Sueldo;

            await empleado.insert();

            res.json({
                ok: true,
                mensaje: 'Empleado agregado correctamente'
            });

        } catch (err) {
            console.log(err)
            if (Array.isArray(err)) {
                console.log(err);
                res.status(err[0]).json({
                    err: err[1]
                });
            } else {
                console.log(err);
                res.json({
                    err
                });
            }
        }
    }

    async UpdateEmpleado(req, res) {
        try {

            let bodyEsperado = [
                { campo: 'Nombre', required: true },
                { campo: 'ApPaterno', required: true },
                { campo: 'ApMaterno', required: true },
                { campo: 'FecNac', required: true },
                { campo: 'Departamento', required: true },
                { campo: 'Sueldo', required: true },
            ];

            await Validaciones.validarBody(req.body, bodyEsperado);

            let id = req.params.id;

            let empleado = await Empleado.selectById(id);

            empleado.Nombre = req.body.Nombre;
            empleado.ApPaterno = req.body.ApPaterno;
            empleado.ApMaterno = req.body.ApMaterno;
            empleado.FecNac = req.body.FecNac;
            empleado.Departamento = req.body.Departamento;
            empleado.Sueldo = req.body.Sueldo;

            await empleado.update();

            empleado = await Empleado.selectById(id);
            res.json({
                empleado
            });


        } catch (err) {

            if (Array.isArray(err)) {
                console.log(err);
                res.status(err[0]).json({
                    err: err[1]
                });
            } else {
                console.log(err);
                res.json({
                    err
                });
            }

        }
    }

    async deleteEmpleado(req, res) {
        try {

            let id = req.params.id;

            let empleado = await Empleado.selectById(id);

            await empleado.delete();

            res.json({
                mensaje: `Empleado con id: ${id} eliminado correctamente`
            });

        } catch (err) {

            if (Array.isArray(err)) {
                console.log(err);
                res.status(err[0]).json({
                    err: err[1]
                });
            } else {
                console.log(err);
                res.json({
                    err
                });
            }

        }
    }


}

module.exports = { EmpleadosControlador };