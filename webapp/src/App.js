import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import React, { useEffect } from 'react';
import Contaniner from './components/utils/Contenedor';
import { useWebId } from '@solid/react';
import { saveUser } from './api/api';
import push from './components/utils/Notificacion';
//import firebase from './api/firebase';

function App() { 

  const webId = useWebId();

  function saveLocateUser() {
    if (webId) {
      // pedimos la pocalización actual
      navigator.geolocation.getCurrentPosition((pos) => {
        
        //prueba push
        push();
        
        //salvamos al usuario
        saveUser(webId, pos.coords.latitude, pos.coords.longitude).catch(err => console.log(err));
      });
    }
  };


  useEffect(() => {
    // Guardamos la localización cada 20 segundos
    setInterval(saveLocateUser, 20000);

    /* //firebase
    const msg = firebase.messaging();
    msg.requestPermission().then(()=>{
      return msg.getToken();

    }).then((data)=>{
      console.warn("token",data);
    }) */
  });


  return (
    <div className="App">
      <React.Fragment>
        <CssBaseline />
        <Contaniner />
      </React.Fragment>
    </div>
  );
}

export default App;