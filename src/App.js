import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import './Navbar'
import navBar from './Navbar';
import './Input_box'
import './Textarea'
import textArea from './Textarea';
import './Manifest'
import headerStyled from './Manifest';


function ResponsiveAutoExample() {
  return (
    <>
      <Container>
        <Row md={1}>{navBar()}</Row>
        <Row>
          <Col>
            <Container>
              {headerStyled()}
            </Container>
          </Col>
          <Col xs={6} sm={4}>{textArea()} </Col>
        </Row>
      </Container>



    </>
  );
}
//Accordion within Accordions
export default ResponsiveAutoExample;