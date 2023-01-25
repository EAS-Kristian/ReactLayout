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