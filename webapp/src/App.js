import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import React, { useEffect } from 'react';
import Contaniner from './components/utils/Contenedor';
import { useWebId } from '@solid/react';
import { saveUser } from './api/api';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import push from './components/utils/Notificacion';

function App() {

  const webId = useWebId();
  
  function saveLocateUser() {
    if (webId) {
      // pedimos la pocalización actual
      navigator.geolocation.getCurrentPosition((pos) => {

        //salvamos al usuario
        saveUser(webId, pos.coords.latitude, pos.coords.longitude).catch(err => console.log(err));
      });
    }
  };


  useEffect(() => {
    // Guardamos la localización cada 20 segundos
    push("Amigo 1");
    setInterval(saveLocateUser, 20000);
  });


  return (
    <div id="divPrincipal" className="App">
      <React.Fragment>
        <ReactNotification/>
        <CssBaseline />
        <Contaniner webId={webId} />
      </React.Fragment>
    </div>
  );
}

export default App;