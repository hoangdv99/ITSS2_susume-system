import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import Logo from "../../assets/images/logo3.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const { currentUser, logout } = useAuth();
  const dropdownTitle = "Hello, " + currentUser.email;
  const navigate = useNavigate();
  const onLogoClick = () => {
    navigate("/");
  };
  const handleLogout = async () => {
    await logout();
  };

  return (
    <Navbar bg="light" style={{ marginBottom: "10px" }}>
      <Container>
        <Navbar.Brand>
          <img
            src={Logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            onClick={onLogoClick}
          />
        </Navbar.Brand>
        <Nav className="me-auto my-2">
          <Nav.Link as={Link} to='/products'>商材管理</Nav.Link>
          <Nav.Link as={Link} to='/advertisements'>広告管理</Nav.Link>
          <Nav.Link as={Link} to='/account-balance'>予算</Nav.Link>
          <Nav.Link as={Link} to='/'>ダッシュボード</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown id="basic-nav-dropdown" title={dropdownTitle}>
            <NavDropdown.Item onClick={handleLogout}>
              サインアウト
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}
