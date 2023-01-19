import validator from '@rjsf/validator-ajv8';
import yaml from 'js-yaml';
import axios from "axios";
import { Spinner } from 'react-bootstrap';
import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Button, Navbar } from 'react-bootstrap';
import CodeEditor from '@uiw/react-textarea-code-editor';
import './index.css'
import Form from "@rjsf/bootstrap-4";




export default function App() {

  const [capabilities, setCapabilities] = useState({});
  const [loadingTextBox, setLoadingTextBox] = useState(false);
  const [selectedCapability, setSelectedCap] = useState(undefined);
  const [selectedVersion, setSelectedVersion] = useState(undefined);
  const [invalidCapabilities, setInValidCapabilities] = useState([]);
  const [invalidDirectives, setInValidDirectives] = useState([]);
 

  useEffect(() => {
    let fn = async () => {
      setLoadingTextBox(true)
      let tempObj = {}
      let { data: capabilitiesData } = await axios.get('/api/capabilities')
      for (let i in capabilitiesData) {
        let { data: capabilitiesTagsData } = await axios.get(`/api/capability/${capabilitiesData[i]}-capability/tags`)
        for (let j in capabilitiesTagsData) {
          tempObj[capabilitiesData[i]] ? tempObj[capabilitiesData[i]][capabilitiesTagsData[j]] = {} : tempObj[capabilitiesData[i]] = { [capabilitiesTagsData[j]]: {} }
          let { data: capabilitiesTagsDirectives } = await axios.get(`api/capability/${capabilitiesData[i]}-capability/tag/${capabilitiesTagsData[j]}/directives`)
          for (let k in capabilitiesTagsDirectives) {
            tempObj[capabilitiesData[i]] ? tempObj[capabilitiesData[i]][capabilitiesTagsData[j]][capabilitiesTagsDirectives[k]] = {} : tempObj[capabilitiesData[i]][capabilitiesTagsData[j]] = { [capabilitiesTagsDirectives[k]]: {} }
          }

        }
      }
      setCapabilities(tempObj)
      setLoadingTextBox(false)
    }

    fn()
  }, []);

  const [manifest, setManifest] = useState({
    "capabilities": [
    ]
  })

  const loadCache = async (manifestPasted) => {
    setLoadingTextBox(true)
    const cap = []
    const dir = []
    let curCapabilities = capabilities
    console.log(manifestPasted)
    if (manifestPasted !== undefined) {
      if (manifestPasted.capabilities) {
        for (let componentIndex in manifestPasted.capabilities) {
          let component = manifestPasted.capabilities[componentIndex]
          if (curCapabilities[component.name]) {
            if (curCapabilities[component.name][component.version]) {
              if (component.directives) {
                for (let directiveIndex in component.directives) {
                  let directive = component.directives[directiveIndex]
                  let { data } = await axios.get(`/api/capability/${component.name}-capability/tag/${component.version}/directive/${Object.keys(directive)[0]}`)
                  console.log(directive)

                  if (curCapabilities[component.name][component.version][Object.keys(directive)[0]]) {
                    curCapabilities[component.name][component.version][Object.keys(directive)[0]] = data
                  } else {
                    curCapabilities[component.name][component.version][Object.keys(directive)[0]] = {}
                    dir.push({ cap: Number(componentIndex), dir: Number(directiveIndex) })
                  }
                }
              } else {
              }
            } else {
              cap.push(componentIndex)
            }
          } else {
            cap.push(componentIndex)
          }
        }
        setInValidCapabilities(cap)
        setInValidDirectives(dir)
      }
      else {
        console.log("capabilities: expected and not found")
      }
      setCapabilities(curCapabilities)
      setLoadingTextBox(false)
    }
    else {
       let tempObj={"capabilities": []}
      setManifest(tempObj)
      loadCache(yaml.load)
    }

  }

  const handleUpdateDirective = (formData, componentIndex, directiveIndex) => {

    let m = { ...manifest }
    m.capabilities[componentIndex].directives[directiveIndex] = formData.formData;

    setManifest(m);

  }
  const addDirective = (componentIndex, directiveName) => {
    let tempCode = { ...manifest }
    if (tempCode.capabilities[componentIndex].directives) {
      tempCode.capabilities[componentIndex].directives.push({ [directiveName]: {} })
    }
    else {
      console.log("No Directives")
    }
    setManifest(tempCode);
    loadCache(manifest)
  }
  const deleteDirective = (componentIndex, directiveIndex) => {
    let tempCode = { ...manifest }
    delete tempCode.capabilities[componentIndex].directives[directiveIndex]
    tempCode.capabilities[componentIndex].directives = tempCode.capabilities[componentIndex].directives.filter(function () { return true });
    setManifest(tempCode)

  }
  const deleteCapability = (componentIndex) => {
    let tempCode = { ...manifest }
    delete tempCode.capabilities[componentIndex]
    tempCode.capabilities = tempCode.capabilities.filter(function () { return true })
    setManifest(tempCode)
  }


  const handleAddCapability = (capability, version) => {
    let m = { ...manifest }
    if (m.capabilities) {
      m.capabilities.push({
        "name": capability,
        "version": version,
        "directives": []
      });
    }

    setManifest(m);
    loadCache(m)

  }
  const handleManifestTextChange = event => {
    setManifest(yaml.load(event.target.value));
    loadCache(yaml.load(event.target.value));
  }


  return (

    <Container fluid>
      <Row>
        <Col>
          <Row>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
              <Container>
                <Navbar.Brand href="#home">Documentation</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="#features">How-To Guide</Nav.Link>
                    <Nav.Link href="https://github.com/">Github</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Row>
        </Col>
      </Row>
      {loadingTextBox ? <Spinner animation="border" size="sm" variant="primary" /> :
        <Row>
          <Col>
            <Container>
              <Card className="manifest">
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
                      <Button onClick={() => handleAddCapability(selectedCapability, selectedVersion)}>Add</Button>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body className="cardname">
                  <Row sm={8}>
                    {manifest.capabilities ? manifest.capabilities.map((component, componentIndex) => {
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
                                      <Dropdown onSelect={(eventKey) => { addDirective(componentIndex, eventKey) }}>
                                        <Dropdown.Toggle className="float-end manifest" variant="primary" id="dropdown-basic">
                                          Add Directive
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                          {manifest !== {} && Object.keys(capabilities[component.name][component.version]).map((value) => <Dropdown.Item eventKey={value}>{value}</Dropdown.Item>)}
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </Col></>
                                }
                                <Col><Button className="float-end deletebutton" variant="danger" onClick={() => deleteCapability(componentIndex)}>X</Button></Col>
                              </Accordion.Header>
                              <Accordion.Body>
                                {component.directives ?
                                  !invalidCapabilities.includes(componentIndex.toString()) && component.directives.map((directive, directiveIndex) => {
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
                                                  <Button variant="danger" onClick={() => deleteDirective(componentIndex, directiveIndex)} className="deletebutton">X</Button>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                  {capabilities[component.name][component.version][Object.keys(directive)[0]] &&
                                                    <Form
                                                      schema={capabilities[component.name][component.version][Object.keys(directive)[0]]}
                                                      formData={directive}
                                                      onChange={(formdata) => handleUpdateDirective(formdata, componentIndex, directiveIndex)}
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
                                  )
                                  : <Card><Card.Body class='card-back formgroup'>{`'directives:' expected and not found in capability ${component.name}`}</Card.Body></Card>}
                              </Accordion.Body>

                            </Accordion>
                          </Card>
                        </div>
                      )
                    }) : <Card><Card.Body class='card-back formgroup'>{"'capabilities:' expected and not found"}</Card.Body></Card>
                    }
                  </Row>
                </Card.Body>
              </Card>
            </Container>
          </Col>
          <Col xs={6} sm={4}>
            <Row>MANIFEST YAML</Row>
            {/* <Button
                        variant="primary"
                        onClick={(e) => {
                            let paste = navigator.clipboard.readText();
                            setManifest(paste);
                        }}
                    >
                        Paste
                    </Button> */}
            <div>

              <CodeEditor
                value={yaml.dump(manifest) || ""}
                language="yaml"
                onChange={handleManifestTextChange}
                padding={15}
                style={{
                  fontSize: 12,
                  backgroundColor: "#f5f5f5",
                  fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
              />
            </div>
          </Col>
        </Row>
      }
    </Container>

  )
}




