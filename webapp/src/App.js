import React from 'react';
import './App.css';
import {HomeView} from './components/HomeView';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component{
  constructor(){
    super()
    this.state = { users: [] }
  }

  refreshUsers(users) {
    this.setState({ users: users })
  }

  render(){
    return(
      <div className="App" >
        <React.Fragment>

          <Router>
            <HomeView/>
            <Switch>

            </Switch>

          </Router>

        </React.Fragment>
      </div>
    )
  }
}

export default App;