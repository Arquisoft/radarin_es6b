import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Locations } from './components/utils/Locations';
import React from 'react';
import Contaniner from './components/utils/Contenedor';
class App extends React.Component {

  constructor() {
    super()
    /* array para almacenar los usuarios conectados*/
    this.state = {
      users: []

    }
  }


  render() {
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
}

export default App;