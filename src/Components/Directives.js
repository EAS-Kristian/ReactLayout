import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { useContext } from 'react';
import Context from '../StateProvider';
import Directive from './Directive';


function Directives({ component, componentIndex }) {

    const invalidCapabilities = useContext(Context).invalidCapabilities

    return (
        <Accordion.Body>
            {component.directives ?
                !invalidCapabilities.includes(componentIndex.toString()) && component.directives.map((directive, directiveIndex) => {
                    return (
                        <Directive component={component} componentIndex={componentIndex} directive={directive} directiveIndex={directiveIndex} />
                    )
                }
                )
                : <Card><Card.Body class='card-back formgroup'>{`'directives:' expected and not found in capability ${component.name}`}</Card.Body></Card>}
        </Accordion.Body>
    )
}

export default Directives