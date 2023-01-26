import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import Context from '../StateProvider';
import Directives from './Directives';


function Capability({ component, componentIndex }) {
    const invalidCapabilities = useContext(Context).invalidCapabilities
    const AddDirective = useContext(Context).AddDirective
    const DeleteCapability = useContext(Context).DeleteCapability
    const [capabilities] = useContext(Context).capabilities;
    const [manifest] = useContext(Context).manifest;
    const MoveCapability = useContext(Context).MoveCapability

    return (


        <div >
            <Card className="no-padding">
                <Accordion>
                    <Accordion.Header>
                        {invalidCapabilities.includes(componentIndex.toString()) ?
                            <Card.Body class="card-back">
                                <Col>
                                    Capability {component.name} or version {component.version} is invalid
                                </Col>
                            </Card.Body>
                            :
                            <><Col>
                                {component.name}
                            </Col>
                                <Col>
                                    <Dropdown onSelect={(eventKey) => { AddDirective(componentIndex, eventKey) }}>
                                        <Dropdown.Toggle className="float-end manifest" variant="primary" id="dropdown-basic">
                                            Add Directive
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {manifest !== {} && Object.keys(capabilities[component.name][component.version]).map((value) => <Dropdown.Item eventKey={value}>{value}</Dropdown.Item>)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col></>
                        }
                        <Col></Col><Col><Button variant="link" onClick={() => MoveCapability("UP", componentIndex)} className="bi bi-arrow-up"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                        </svg></Button> <Button variant="link" onClick={() => MoveCapability("DOWN", componentIndex)} className="bi bi-arrow-down"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                        </svg></Button>
                            <Button className="float-end deletebutton" variant="danger" onClick={() => DeleteCapability(componentIndex)}>X</Button></Col>
                    </Accordion.Header>
                    <Directives component={component} componentIndex={componentIndex} />
                </Accordion>
            </Card>
        </div>
    )

}
export default Capability