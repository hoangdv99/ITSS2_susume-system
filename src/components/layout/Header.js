import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  Container,
  NavDropdown,
  Nav
} from 'react-bootstrap'
import Logo from '../../assets/images/logo.svg'

export default function Header() {
  return (
    <Navbar bg="light">
      <Container>
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
          <NavDropdown title="Hello, Hoang" id="basic-nav-dropdown">
            <NavDropdown.Item href="#">サインアウト</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
