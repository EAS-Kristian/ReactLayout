import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown'
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './components/Navbar';
import './components/Input_box';
import './components/Textarea';
import capabilityCard from './components/Capabilityelement';


function headerStyled() {
  return (
    <Card className="manifest">
      <Card.Header as="h5">Manifest</Card.Header>
      <Card.Header>
        <Row>
          <Col>
            <Dropdown>
              <Dropdown.Toggle>
                Capabilities
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>iis</Dropdown.Item>
                <Dropdown.Item>file_utils</Dropdown.Item>
                <Dropdown.Item>os_utils</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle>
                Version
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>0.0.3</Dropdown.Item>
                <Dropdown.Item>0.0.4</Dropdown.Item>
                <Dropdown.Item>0.0.5</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col sm={7}>
            <Button>Add</Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body className="cardname">
        <Row sm={8}>
          {capabilityCard()}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default headerStyled;