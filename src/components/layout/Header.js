import 'bootstrap/dist/css/bootstrap.min.css';
import React ,{ useState } from 'react';
import {
  Button, Nav, Navbar, NavDropdown
} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/images/logo.svg';
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    setError("")
    try {
      await logout()
      navigate("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  return (
    <Navbar bg="light" fixed="top">
        <Navbar.Brand href="#home">
          <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Nav className="me-auto my-2">
          <Nav.Link href="#">商材管理</Nav.Link>
          <Nav.Link href="#">広告管理</Nav.Link>
          <Nav.Link href="#">ダッシュボード</Nav.Link>
          <Nav.Link href="#">商売履歴</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown title="Nguyễn Công" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <Button variant="link" onClick={handleLogout}>
                Log Out
              </Button>
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
    </Navbar>
  )
}
