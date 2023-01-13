import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './components/Navbar'
import navBar from './components/Navbar';
import './components/Input_box'
import  renderManifestYaml from './components/Textarea';
import headerStyled from './Manifest';


function ResponsiveAutoExample() {

  return (
    <>
      <Container fluid>
        <Col>
        <Row>{navBar()}</Row>
        </Col>
        <Row>
          <Col>
            <Container>
              {headerStyled()}
            </Container>
          </Col>
          <Col xs={6} sm={4}>
            <Row>MANIFEST YAML</Row>
            {renderManifestYaml()} 
            </Col>
        </Row>
      </Container>



    </>
  );
}
//Accordion within Accordions
export default ResponsiveAutoExample;