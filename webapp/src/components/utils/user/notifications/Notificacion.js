import Push from 'push.js';
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

function spawnNotification(texto, covid) {

    // Comprobamos si el navegador soporta las notificaciones
    if (("Notification" in window)) {
        let navegador = navigator.userAgent;
        let detector = 0; //Variable que detectará si se usa un móvil
        if (navegador.match(/Android/i)) {
            detector = 1; //Si es un móvil, cambio el valor del detector
        }
        if (detector === 1) { //si es un móvil redirecciono la página.
            notificacionMobile(texto, covid);
        } else {
            notificacion(texto, covid);
        }
    }

    // Comprobamos si ya nos habían dado permiso
    else if (Notification.permission === "granted") {
        let navegador = navigator.userAgent;
        let moviles = ["Mobile", "iPhone", "iPod", "BlackBerry", "Opera Mini", "Sony", "MOT", "Nokia", "samsung"];
        let detector = 0; //Variable que detectará si se usa un móvil
        moviles.forEach(i => {
            let compruebo = navegador.indexOf(moviles[i]);
            if (compruebo > -1) {
                detector = 1; //Si es un móvil, cambio el valor del detector
            }
        });
        if (detector === 1) { //si es un móvil redirecciono la página.
            notificacionMobile(texto, covid);
        } else {
            notificacion(texto, covid);
        }
    }

    // Si no, tendremos que pedir permiso al usuario
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // Si el usuario acepta, lanzamos la notificación
            if (permission === "granted") {
                let navegador = navigator.userAgent;
                let moviles = ["Mobile", "iPhone", "iPod", "BlackBerry", "Opera Mini", "Sony", "MOT", "Nokia", "samsung"];
                let detector = 0; //Variable que detectará si se usa un móvil
                moviles.forEach(i => {
                    let compruebo = navegador.indexOf(moviles[i]);
                    if (compruebo > -1) {
                        detector = 1; //Si es un móvil, cambio el valor del detector
                    }
                });
                if (detector === 1) { //si es un móvil redirecciono la página.
                    notificacionMobile(texto, covid);
                } else {
                    notificacion(texto, covid);
                }
            }
        });
    }
}

function notificacion(texto, covid) {
    if (covid) {
        Push.create("Warning: " + texto + " have COVID and is close to you", {
            body: "Close friend with COVID",
            icon: "../img/logoNotificacion.png",
            native: true,
            onClick: function () {
                this.close();
            }
        }).catch(err => console.log(err));
    }
    else {
        Push.create(texto + " is close to you", {
            body: "Close friend",
            icon: "../img/logoNotificacion.png",
            native: true,
            onClick: function () {
                this.close();
            }
        }).catch(err => console.log(err));
    }
}

function notificacionMobile(texto, covid) {
    if (covid) {
        store.addNotification({
            title: "Warning: " + texto + " have COVID and is close to you",
            message: "Close friend with COVID",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            icon: "../img/logoNotificacion.png",
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    } else {
        store.addNotification({
            title: texto + " is close to you",
            message: "Close friend",
            type: "info",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            icon: "../img/logoNotificacion.png",
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }
}

export default spawnNotification;