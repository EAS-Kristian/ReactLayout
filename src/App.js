import validator from '@rjsf/validator-ajv8';
import yaml from 'js-yaml';
import axios from "axios";
import { Spinner } from 'react-bootstrap';
import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useContext, useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import CodeEditor from '@uiw/react-textarea-code-editor';
import './index.css'
import Form from "@rjsf/bootstrap-4";
import NavBar from './components/Navbar'
import { StateProvider } from './StateProvider';
import Context from './StateProvider'
import Menu from './components/Menu'
import LoadCache from './components/LoadCache';
import HandleUpdateDirective from './components/UpdateDir';
import AddDirective from './components/AddDir';
import DeleteDirective from './components/DeleteDir';
import DeleteCapability from './components/DeleteCap';
import HandleManifestTextChange from './components/ManifestTextChange';


export default function App() {

  const desk = useContext(Context)
  console.log(desk)
  const [capabilities, setCapabilities] = useContext(Context).capabilities;
  const [loadingTextBox, setLoadingTextBox] = useContext(Context).loadingTextBox;
  const [selectedCapability, setSelectedCap] = useContext(Context).selectedCapability;
  const [selectedVersion, setSelectedVersion] = useContext(Context).selectedVersion;
  const [invalidCapabilities, setInValidCapabilities] = useContext(Context).invalidCapabilities;
  const [invalidDirectives, setInValidDirectives] = useContext(Context).invalidDirectives;
  const [yamlError, setYamlError] = useContext(Context).yamlError;
  const [manifest, setManifest] = useContext(Context).manifest;



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

  return (
      <Container fluid>
        <NavBar />
        {loadingTextBox ? <Spinner animation="border" size="sm" variant="primary" /> :
          <Row>
            <Col>
              <Container>
                <Card className="manifest">
                  {/* {loadingTextBox && <Menu />} */}
                  <Menu/>
                  {/* {Menu()} */}
                  <Card.Body className="cardname">
                    <Row sm={8}>
                      {(manifest.capabilities && typeof (manifest.capabilities) === "object") ? manifest.capabilities.map((component, componentIndex) => {
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
          </Row>
        }
      </Container>

  )
}




