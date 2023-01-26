
import Dropdown from 'react-bootstrap/Dropdown';
import { useContext } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Context from '../StateProvider'


function Menu() {
    const [capabilities] = useContext(Context).capabilities;
    const [selectedCapability, setSelectedCap] = useContext(Context).selectedCapability;
    const [selectedVersion, setSelectedVersion] = useContext(Context).selectedVersion;
    const HandleAddCapability = useContext(Context).HandleAddCapability
    return (
        <Card>
            <Card.Header as="h5">Manifest</Card.Header>
            <Card.Header>
                <Row>
                    <Col>
                        <Dropdown onSelect={(eventKey) => { setSelectedCap(eventKey) }}>
                            <Dropdown.Toggle className="float-start" variant="primary" id="dropdown-basic">
                                {selectedCapability !== undefined ? selectedCapability : "Capability"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {Object.keys(capabilities).map(key => <Dropdown.Item key={key} value={key} eventKey={key}>{key}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <Dropdown onSelect={(eventKey) => { setSelectedVersion(eventKey) }}>
                            <Dropdown.Toggle className="float-end" variant="primary" id="dropdown-basic">
                                {selectedVersion !== undefined ? selectedVersion : "Version"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {selectedCapability !== undefined && Object.keys(capabilities[selectedCapability]).map((value) => <Dropdown.Item eventKey={value}>{value}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col sm={7}>
                        <Button onClick={() => HandleAddCapability(selectedCapability, selectedVersion)}>Add</Button>
                    </Col>
                </Row>
            </Card.Header>
        </Card>
    );
}
export default Menu
