importScripts('https://www.gstatic.com/firebasejs/8.4.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.3/firebase-messaging.js');



firebase.initializeApp({
  // Project Settings => Add Firebase to your web app
    messagingSenderId: "581545841226"
  });
  
  const messaging = firebase.messaging();
  
  messaging.setBackgroundMessageHandler(function(payload) {
    const promiseChain = clients
      .matchAll({
        type: "window",
        includeUncontrolled: true
      })
      .then(windowClients => {
        for (let i = 0; i < windowClients.length; i++) {
          const windowClient = windowClients[i];
          windowClient.postMessage(payload);
        }
      })
      .then(() => {
        return registration.showNotification("my notification title");
      });
    return promiseChain;
  });
  
  self.addEventListener('notificationclick', function(event) {
     // do what you want
     
    });
   


/* if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }

firebase.initializeApp({
    messagingSenderId: "581545841226",
  })

const initMessaging = firebase.messaging() */