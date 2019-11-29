class Validaciones {

    static validarBody(body, bodyEsperado) {
        return new Promise((resolve, reject) => {

            let errores = [];

            for (let x = 0; x < bodyEsperado.length; x++) {

                if (typeof(body[bodyEsperado[x].campo]) == 'undefined') {
                    let nuevoError = `No se envio la propiedad ${bodyEsperado[x].campo} en el body`;
                    if (errores.filter((error) => {
                            return error == nuevoError;
                        }).length == 0) {
                        errores.push(nuevoError);
                    }
                } else {
                    if (body[bodyEsperado[x].campo] == '' || body[bodyEsperado[x].campo] == null) {
                        let nuevoError = `La propiedad ${bodyEsperado[x].campo} no puede estar vacia `;

                        if (errores.filter((error) => {
                                return error == nuevoError;
                            }).length == 0) {
                            errores.push(nuevoError);
                        }
                    }
                }

            }
            if (errores.length > 0) return reject([400, errores]);
            resolve(true);
        });
    }

}

module.exports = { Validaciones };