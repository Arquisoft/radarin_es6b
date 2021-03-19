import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import styled from 'styled-components'

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
function NavComponent() {

    return (
        <Styles>
            <ReactBootstrap.Navbar bg="dark" expand="lg">
                <ReactBootstrap.Image src="/img/icon.svg" style={{width:'50px', height:'50px'}}/>
                <h1 style={{marginLeft:'10px',marginRight:'10px', color:'#00FFF3', fontFamily: 'SF Pro Display'}}>Radarin</h1>
                <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
                <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
                    <ReactBootstrap.Nav className="mr-auto">
                        <ReactBootstrap.Nav.Link href="#home">Home</ReactBootstrap.Nav.Link>
                        <ReactBootstrap.Nav.Link href="#link">Localizaciones</ReactBootstrap.Nav.Link>
                        <ReactBootstrap.NavDropdown title="Amigos" id="basic-nav-dropdown">
                            <ReactBootstrap.NavDropdown.Item href="#action/3.1" style={{color: 'black'}}>Mis amigos</ReactBootstrap.NavDropdown.Item>
                        </ReactBootstrap.NavDropdown>
                    </ReactBootstrap.Nav>
                </ReactBootstrap.Navbar.Collapse>
            </ReactBootstrap.Navbar>
        </Styles>
    );
}




export default NavComponent;