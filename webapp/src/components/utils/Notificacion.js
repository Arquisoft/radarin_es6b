import Push from 'push.js';

function spawnNotification() {

    // Comprobamos si el navegador soporta las notificaciones
    if (!("Notification" in window)) {
        alert("Este navegador no soporta las notificaciones del sistema");
    }

    // Comprobamos si ya nos habían dado permiso
    else if (Notification.permission === "granted") {
        notificacion();
    }

    // Si no, tendremos que pedir permiso al usuario
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
        // Si el usuario acepta, lanzamos la notificación
        if (permission === "granted") {
            notificacion();
        }
        });
    }
}

function notificacion(){
    Push.create("Posible amgio a tu alrededor",{
        body: "Añadir amigo",
        icon: "../img/logoNotificacion.png",
        onClick : function(){ 
            //TODO Añadir funcionalidad añadir amigo
            this.close();
        }
    }).catch(err=>console.log(err));
}

export default spawnNotification; 