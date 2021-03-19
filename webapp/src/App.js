import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginView from './components/LoginView';
import React from 'react';

class App extends React.Component {
  render() {
    return (
        <React.Fragment>
            <LoginView/>
        </React.Fragment>
    );
  }
}

export default App;