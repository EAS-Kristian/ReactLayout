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
                        <Col><Button className="float-end deletebutton" variant="danger" onClick={() => DeleteCapability(componentIndex)}>X</Button></Col>
                    </Accordion.Header>
                    <Directives component={component} componentIndex={componentIndex} />
                </Accordion>
            </Card>
        </div>
    )

}
export default Capability