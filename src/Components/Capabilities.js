import Card from 'react-bootstrap/Card';
import { useContext } from 'react';
import Context from '../StateProvider';
import Row from 'react-bootstrap/Row';
import Capability from './Capability';


function Capabilities() {
    const [manifest] = useContext(Context).manifest;

    return (

        <Row sm={8}>
            {(manifest.capabilities && typeof (manifest.capabilities) === "object") ? manifest.capabilities.map((component, componentIndex) => {
                return (
                    <Capability component={component} componentIndex={componentIndex} />
                )
            }) : <Card><Card.Body class='card-back formgroup'>{"'capabilities:' expected and not found"}</Card.Body></Card>
            }
        </Row>
    )
}
export default Capabilities