import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Locations } from './components/utils/Locations';
import React, { useEffect } from 'react';
import Contaniner from './components/utils/Contenedor';
import { useWebId } from '@solid/react';

function App() {

  const webId = useWebId();

  function saveLocateUser() {
    if (webId) {
      // pedimos la pocalización actual
      navigator.geolocation.getCurrentPosition((pos) => {

        // información a enviar al backend
        const information = {
          "solidId": webId,
          "latitud": pos.coords.latitude,
          "longitud": pos.coords.longitude
        }
        // de momento solo en locaL
        fetch("http://localhost:5000/api//user/save", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(information)
        });
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
        <Locations>
          <CssBaseline />
          <Contaniner />
        </Locations>
      </React.Fragment>
    </div>
  );
}

export default App;