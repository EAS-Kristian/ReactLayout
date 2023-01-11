import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function navBar(){
return(
        <>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Nav className="me-auto">
                <Nav.Link href="#documentation">Documentation</Nav.Link>
                <Nav.Link href="#howtoguide">How-To Guide</Nav.Link>
                <Nav.Link href="#github">Github</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          </>
)
}
export default navBar