import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown'
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import './components/Navbar';
import './components/Input_box';
import input from './components/Input_box';
import './components/Textarea';
import './Manifest';
import deleteButton from './components/Delete';





function headerStyled() {
  return (
    <Card>
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
      <Card.Body>
        <Row sm={8}>
          <Card>
            <Accordion>
              <Accordion.Header>
                <Col>
                  Capability 1
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle>
                      Add Directive
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                      <Dropdown.Item>Add Directive</Dropdown.Item>
                      <Dropdown.Item>Directive 1</Dropdown.Item>
                      <Dropdown.Item>Directive 2</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                {deleteButton()}
              </Accordion.Header>
              <Accordion.Body>
                <Card>
                  <Accordion>
                    <Accordion.Header>
                      <Col>
                        Directive 1
                      </Col>
                      {deleteButton()}
                    </Accordion.Header>
                    <Accordion.Body>
                      {input()}
                    </Accordion.Body>
                  </Accordion>
                </Card>
              </Accordion.Body>
            </Accordion>
          </Card>
        </Row>
        <Row sm={8}>
          <Card>
            <Accordion>
              <Accordion.Header>
                <Col>
                  Capability 2
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle>
                      Add Directive
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Add Directive</Dropdown.Item>
                      <Dropdown.Item>Directive 1</Dropdown.Item>
                      <Dropdown.Item>Directive 2</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                {deleteButton()}
              </Accordion.Header>
              <Accordion.Body>
                <Card>
                  <Accordion>
                    <Accordion.Header>
                      <Col>
                        Directive 2
                      </Col>
                      {deleteButton()}
                    </Accordion.Header>
                    <Accordion.Body>
                      {input()}
                    </Accordion.Body>
                  </Accordion>
                </Card>
              </Accordion.Body>
            </Accordion>
          </Card>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default headerStyled;