import React from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


function NavComponent(){

    return <Navbar bg="white" expand="lg" className="nav fixed-top align-items center shadow rounded">
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="./Home">Home</Nav.Link>
                <Nav.Link>Localizaciones</Nav.Link>
                <Nav.Link>Amigos</Nav.Link> 
              
            </Nav> 
        </Navbar.Collapse>
    </Navbar>;
}




export default NavComponent;