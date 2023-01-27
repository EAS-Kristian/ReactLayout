import CodeEditor from '@uiw/react-textarea-code-editor';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import yaml from 'js-yaml';
import { useContext } from 'react';
import Context from '../StateProvider'

function InputArea() {
    const [manifest] = useContext(Context).manifest;
    const HandleManifestTextChange = useContext(Context).HandleManifestTextChange
    const yamlError = useContext(Context).yamlError
    return (
        <>
            <Col xs={6} sm={4}>
                <Row>MANIFEST YAML</Row>
                <div>
                    <CodeEditor
                        value={yaml.dump(manifest) || ""}
                        language="yaml"
                        onChange={HandleManifestTextChange}
                        padding={15}
                        style={{
                            fontSize: 12,
                            backgroundColor: "#f5f5f5",
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        }}
                    />
                    <h3>{yamlError}</h3>
                </div>
            </Col>
            <Col xs={1}></Col></>
    )
}

export default InputArea