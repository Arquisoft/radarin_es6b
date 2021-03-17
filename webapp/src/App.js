/*import React from 'react';
import './App.css';
import Welcome from './components/Welcome';
import EmailForm from "./components/EmailForm";
import NavComponent from './components/NavComponent';
import UserList from "./components/UserList";
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
        <header className="App-header">
        <NavComponent />
           {/* <img src={logo} className="App-logo" alt="logo"/>  }
          <Welcome name="ASW students"/> 
          
        </header>
       
        <div className="App-content">
          <EmailForm refreshUsers={this.refreshUsers.bind(this)}/>
          <UserList users={this.state.users}/>
          <a className="App-link"
            href="https://github.com/pglez82/radarin_0"
            target="_blank"
            rel="noopener noreferrer">Source code</a>
        </div>
      </div>
    )
  }
}

export default App;*/

import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import LogIn from "./components/LogIn";
import solidauth from "solid-auth-client";
import Prueba from "./components/Prueba";
//import LoginForm from "./components/LoginForm";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      webId: "",
      logged: false
    };
  }

  //async fetchUsers() {
  //const URL = (await solidauth.currentSession()).webId;
  //try {
  //let listOfFriends = await getFriends(URL);
  //this.setState((prevState) => ({ ...prevState, users: listOfFriends }));
  //console.log(listOfFriends);
  // } catch (error) {
  // console.log("Error fetching user list from restapi. Is it on?");
  //}
  //}

  async logIn() {
    let session = await solidauth.currentSession();
    let popupUri = "https://solidcommunity.net/common/popup.html";
    if (!session) session = await solidauth.popupLogin({ popupUri });
    this.setState((oldState) => ({
      ...oldState,
      webId: session.webId,
      logged: !oldState.logged
    }));
    //this.fetchUsers();
    alert(`Has accedido como ${session.webId}`);
  }

  logOut() {
    solidauth.logout().then(() => alert("You have unlink yout POD"));
    this.setState((oldState) => ({
      ...oldState,
      webId: "",
      logged: !oldState.logged
    }));
  }

  zoomInUser(user) {
    this.setState((prevState) => ({
      ...prevState,
      mapOptions: {
        lat: user.latitud,
        lon: user.longitud,
        zoom: 10
      }
    }));
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>App Radarin</h1>
        </header>

        {!this.state.logged && (
          <div className="App content">
            <div className="NotLogged content">
              <LogIn showLogInPopUp={this.logIn.bind(this)} />
              <br />
            </div>
          </div>
        )}

        {this.state.logged && (
          <div>
            <div>
              <Button variant="secondary" onClick={this.logOut.bind(this)}>
                Unlik your POD{" "}
              </Button>
              <Prueba />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;