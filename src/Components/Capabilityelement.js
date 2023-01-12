import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown'
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import './Navbar';
import './Input_box';
import input from './Input_box';
import './Textarea';
import deleteButton from './Delete';


function capabilityCard() {
  return (
    <Card className="no-padding">
      <Accordion>
        <Accordion.Header>
          <Col>
            Capability 
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
  );
}

export default capabilityCard