import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Node/React TS Project</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavLink to="/" exact activeClassName="selected">
                Home
              </NavLink>
            </Nav>
            <Nav>
              <NavLink to="/add" exact activeClassName="selected">
                Add
              </NavLink>
              <NavLink to="/signup" exact activeClassName="selected">
                Sign Up
              </NavLink>
              <NavLink to="/login" exact activeClassName="selected">
                Login
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
