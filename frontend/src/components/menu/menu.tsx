import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return ( 
    <div className="menu" data-bs-theme="dark">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Територіальні рибалки</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">Home</NavLink>
              <NavLink to="/fishers" className="nav-link">Fishers</NavLink>
              <NavLink to="/orders" className="nav-link">Orders</NavLink>
              <NavLink to="/places" className="nav-link">Places</NavLink>
              <NavLink to="/organisations" className="nav-link">Organisations</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
 
export { Menu };