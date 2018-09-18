var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};


// Escucha cuando un usuario se conecta al chat, entonces se emite un evento en el cual 
// comunicamos el objeto usuario y quedamos a la espera de una respuesta del servidor.
socket.on('connect', function() {
    console.log('Conectado al servidor');
    renderizarH3();
    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Evento: entrarChat', resp);
        // Renderiza usuarios conectados a la sala "resp"
                
        renderizarUsuarios(resp);
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Evento: Disconnect - Perdimos conexión con el servidor');

});

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    console.log('Evento: crearMensaje', mensaje);
    renderizarMensajes(mensaje, false);
    scrollBottom();
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) {
    console.log('Evento: listaPersona');
    renderizarUsuarios(personas);
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {

    console.log('Evento: Mensaje Privado:', mensaje);

});