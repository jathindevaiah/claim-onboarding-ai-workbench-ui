// // src/components/Header.jsx
// import React from "react";
// import { Navbar, Container } from "react-bootstrap";

// const Header = () => (
//   <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
//     <Container className="justify-content-center">
//       <Navbar.Brand className="text-center w-100 fs-3">Claim Onboarding Workbench</Navbar.Brand>
//     </Container>
//   </Navbar>
// );

// export default Header;

// src/components/Header.jsx
import React from "react";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";

const roles = ["Claim Analyst", "Tech Analyst", "Claim VP"];

const Header = ({ isLoggedIn, role, setRole, onLogout, onHome, user }) => {
  if (!isLoggedIn) return null;

  return (
    <Navbar style={{ backgroundColor: "steelblue" }} expand="lg" className="fixed-top">
      <Container fluid className="px-3">
        {/* Home Button */}
        <Button variant="outline-light" className="me-3" style={{ minWidth: 70 }} onClick={onHome}>
          Home
        </Button>

        {/* User Role Dropdown */}
        <Dropdown className="me-3">
          <Dropdown.Toggle variant="outline-light" id="role-dropdown">
            {role}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {roles.map((r) => (
              <Dropdown.Item key={r} active={role === r} onClick={() => setRole(r)}>
                {r}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {/* App Title */}
        <Navbar.Brand className="fs-3 flex-grow-1 text-center">Claim Onboarding Workbench</Navbar.Brand>

        {/* User Icon */}
        <span className="me-3" style={{ color: "#fff", fontSize: 22 }}>
          <i className="bi bi-person-circle"></i> Welcome {user?.username}!
        </span>
        {/* Logout Button */}
        <Button variant="outline-light" onClick={onLogout}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
