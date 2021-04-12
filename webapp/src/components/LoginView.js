import React from "react";
import LogIn from "./LogIn";
import solidauth from "solid-auth-client";
//import { render } from "@testing-library/react";
//import Prueba from "./Prueba";

import * as ReactBootstrap from 'react-bootstrap';
import styled from 'styled-components'
import Map from './utils/Map';



const Styles = styled.div`
  .navbar { background-color: #303030; }
  a, .button, .navbar-nav, .navbar-light .nav-link {
    color: #00FFF3;
    &:hover { color: #36FF00; }
  }
  .navbar-brand {
    font-size: 1.6em;
    font-family: "SF Pro Display","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
    color: #00FFF3;
    &:hover { color: #36FF00; }
  }

  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;

//import LoginForm from "./components/LoginForm";

class LoginView extends React.Component {
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
    }

    render() {
        return (
            <div className="App">
                {!this.state.logged && (
                    <div className="App content">
                        <div className="NotLogged content">
                            <Styles>
                                <ReactBootstrap.Navbar bg="dark" expand="lg">
                                    <ReactBootstrap.Image src="/img/icon.svg" style={{ width: '50px', height: '50px' }} />
                                    <h1 style={{ marginLeft: '10px', marginRight: '10px', color: '#00FFF3', fontFamily: 'SF Pro Display' }}>Radarin</h1>
                                </ReactBootstrap.Navbar>
                            </Styles>
                            <LogIn showLogInPopUp={this.logIn.bind(this)} />
                            <br />
                        </div>
                    </div>
                )}

                {this.state.logged && (
                    <div>
                        <div>
                            <Styles>
                                <ReactBootstrap.Navbar bg="dark" expand="lg">
                                    <ReactBootstrap.Image src="/img/icon.svg" style={{ width: '50px', height: '50px' }} />
                                    <h1 style={{ marginLeft: '10px', marginRight: '10px', color: '#00FFF3', fontFamily: 'SF Pro Display' }}>Radarin</h1>
                                    <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
                                        <ReactBootstrap.Nav className="mr-auto">
                                            <ReactBootstrap.Nav.Link href="#home">Home</ReactBootstrap.Nav.Link>
                                            <ReactBootstrap.Nav.Link href="#link">Localizaciones</ReactBootstrap.Nav.Link>
                                            <ReactBootstrap.NavDropdown title="Amigos" id="basic-nav-dropdown">
                                                <ReactBootstrap.NavDropdown.Item href="#action/3.1" style={{ color: 'black' }}>Mis amigos</ReactBootstrap.NavDropdown.Item>
                                            </ReactBootstrap.NavDropdown>
                                        </ReactBootstrap.Nav>
                                    </ReactBootstrap.Navbar.Collapse>
                                    <ReactBootstrap.Button variant="secondary" onClick={this.logOut.bind(this)}>Unlik your POD{" "}</ReactBootstrap.Button>
                                </ReactBootstrap.Navbar>
                            </Styles>
                            <Map />

                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default LoginView;