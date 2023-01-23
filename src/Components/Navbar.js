import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
import { useContext } from 'react';
import StateProvider from '../StateProvider';

function NavBar() {
  const laptop = useContext(StateProvider).digger
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
      <Container className="navbar-override">
        <Navbar.Brand href="#home">Documentation</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">How-To Guide {laptop}</Nav.Link>
            <Nav.Link href="https://github.com/">Github</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar