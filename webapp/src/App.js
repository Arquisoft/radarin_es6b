import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import LogIn from "./components/LogIn";
import solidauth from "solid-auth-client";
import Home from "./Home";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      webId: "",
      logged: false
    };
  }

 

  async logIn() {
    let session = await solidauth.currentSession();
    let popupUri = "https://solidcommunity.net/common/popup.html";
    if (!session) session = await solidauth.popupLogin({ popupUri });
    this.setState((oldState) => ({
      ...oldState,
      webId: session.webId,
      logged: !oldState.logged
    }));
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
              <Home />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;