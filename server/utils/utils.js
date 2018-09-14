
const crearMensaje = ( nombre, mensaje ) => {
console.log("EN UTILIDAD:", nombre + " "+ mensaje);
    return {
        nombre, 
        mensaje,
        fecha: new Date().getTime()
    }
}


module.exports = {
    crearMensaje
}