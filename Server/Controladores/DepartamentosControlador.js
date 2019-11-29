//MODELO
const { Departamento } = require('../Modelos/Departamento');

class DepartamentosControlador {

    async getDepartamentos(req, res) {

        try {
            let departamentos = await Departamento.select();

            res.json({
                departamentos
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

module.exports = { DepartamentosControlador };