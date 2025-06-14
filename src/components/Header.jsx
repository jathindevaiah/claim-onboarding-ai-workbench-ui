// src/components/Header.jsx
import React from "react";
import { Navbar, Container } from "react-bootstrap";

const Header = () => (
  <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
    <Container className="justify-content-center">
      <Navbar.Brand className="text-center w-100 fs-3">Claim Onboarding - AI Workbench</Navbar.Brand>
    </Container>
  </Navbar>
);

export default Header;
