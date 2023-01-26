import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { Button } from 'react-bootstrap';
import validator from '@rjsf/validator-ajv8';
import Form from "@rjsf/bootstrap-4";
import { useContext } from 'react';
import Context from '../StateProvider';

function Directive({ component, componentIndex, directive, directiveIndex }) {

    const invalidDirectives = useContext(Context).invalidDirectives
    const DeleteDirective = useContext(Context).DeleteDirective
    const HandleUpdateDirective = useContext(Context).HandleUpdateDirective;
    const [capabilities] = useContext(Context).capabilities;
    const MoveDirective = useContext(Context).MoveDirective

    return (
        <div>
            <>
                {invalidDirectives.find((invalidDirective) => invalidDirective.cap === componentIndex && invalidDirective.dir === directiveIndex) === undefined ?
                    <Card>
                        <Accordion>
                            <Accordion.Header>
                                <Col>
                                    {Object.keys(directive)[0]}
                                </Col>
                                <Col></Col>
                                <Col>
                                    <Button variant="link" onClick={() => MoveDirective("UP", componentIndex, directiveIndex)} className="bi bi-arrow-up"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                                    </svg>
                                    </Button>
                                    <Button variant="link" onClick={() => MoveDirective("DOWN", componentIndex, directiveIndex)} className="bi bi-arrow-down"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                                    </svg>
                                    </Button>
                                </Col>
                                <Button variant="danger" onClick={() => DeleteDirective(componentIndex, directiveIndex)} className="deletebutton">X</Button>
                            </Accordion.Header>
                            <Accordion.Body>
                                {capabilities[component.name][component.version][Object.keys(directive)[0]] &&
                                    <Form
                                        schema={capabilities[component.name][component.version][Object.keys(directive)[0]]}
                                        formData={directive}
                                        onChange={(formdata) => HandleUpdateDirective(formdata, componentIndex, directiveIndex)}
                                        validator={validator}
                                        children={true}
                                        dataDirectiveIndex={directiveIndex}
                                    />}
                            </Accordion.Body>
                        </Accordion>
                    </Card>
                    : <Card><Card.Body class='card-back formgroup'>No or Invalid Directive</Card.Body></Card>}
            </>
        </div>
    )
}
export default Directive 