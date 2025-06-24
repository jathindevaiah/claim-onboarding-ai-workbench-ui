// src/components/Footer.jsx
import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar style={{ backgroundColor: "steelblue" }} className="fixed-bottom py-3 mt-auto">
      <Container className="text-white">
        <div className="small">
          <a href="/privacy" className="text-light text-decoration-none me-3">
            Privacy Policy
          </a>
          <a href="/terms" className="text-light text-decoration-none me-3">
            Terms of Use
          </a>
          <a href="/contact" className="text-light text-decoration-none">
            Contact Us
          </a>
        </div>
        <div>&copy; {new Date().getFullYear()} Claim Onboarding - AI Workbench</div>
      </Container>
    </Navbar>
  );
};

export default Footer;
