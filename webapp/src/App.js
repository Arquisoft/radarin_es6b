import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import React, { useEffect } from 'react';
import Contaniner from './components/utils/Contenedor';
import { useWebId } from '@solid/react';
import { saveUser } from './api/api';

function App() {

  const webId = useWebId();

  function saveLocateUser() {
    if (webId) {
      // pedimos la pocalización actual
      navigator.geolocation.getCurrentPosition((pos) => {
        //salvamos al usuario
        saveUser(webId, pos.coords.latitude, pos.coords.longitude).catch(err=>console.log(err));
      });
    }
  };


  useEffect(() => {
    // Guardamos la localización cada 20 segundos
    setInterval(saveLocateUser, 20000);
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