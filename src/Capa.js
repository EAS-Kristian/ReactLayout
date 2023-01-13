
import validator from '@rjsf/validator-ajv8';
import Form from 'react-bootstrap/form';
import yaml from 'js-yaml';
import axios from "axios";
import { Spinner } from 'react-bootstrap';
import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState} from "react";


export default function App() {

    const [capabilities, setCapabilities] = useState({});
    const [loadingTextBox, setLoadingTextBox] = useState(false);
    const [selectedCapability, setSelectedCap] = useState(undefined);
    const [selectedVersion, setSelectedVersion] = useState(undefined);

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
        let curCapabilities = capabilities
        if (manifestPasted.capabilities) {
            for (let componentIndex in manifestPasted.capabilities) {
                let component = manifestPasted.capabilities[componentIndex]
                if (component.directives) {
                    for (let directiveIndex in component.directives) {
                        let directive = component.directives[directiveIndex]
                        let { data } = await axios.get(`/api/capability/${component.name}-capability/tag/${component.version}/directive/${Object.keys(directive)[0]}`)
                        console.log(`/api/capability/${component.name}-capability/tag/${component.version}/directive/${Object.keys(directive)[0]}`)
                        if (curCapabilities[component.name]) {
                            curCapabilities[component.name][component.version][Object.keys(directive)[0]] = data
                        } else {
                        }
                    }
                }
            }
        }
        else {
            console.log("Invalid Manifest Format")
        }
        setCapabilities(curCapabilities)
        setLoadingTextBox(false)
        console.log(capabilities)

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
        setManifest(tempCode)
    }


    const handleAddCapability = (capability, version) => {
        let m = { ...manifest }
        m.capabilities.push({
            "name": capability,
            "version": version,
            "directives": []
        });

        setManifest(m);
        console.log(manifest);

    }
    const handleManifestTextChange = event => {
        setManifest(yaml.load(event.target.value));
        loadCache(yaml.load(event.target.value));
    }

    return (
        <div>
            <div>
                {
                    <>
                        <div>
                            <Dropdown onSelect={(eventKey) => { setSelectedCap(eventKey) }}>
                                <Dropdown.Toggle className="float-start" variant="success" id="dropdown-basic">
                                    {selectedCapability !== undefined ? selectedCapability : "Capability"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {Object.keys(capabilities).map(key => <Dropdown.Item eventKey={key}>{key}</Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div>

                            <Dropdown onSelect={(eventKey) => { setSelectedVersion(eventKey) }}>
                                <Dropdown.Toggle className="float-end" variant="success" id="dropdown-basic">
                                    {selectedVersion !== undefined ? selectedVersion : "Version"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {selectedCapability !== undefined && Object.keys(capabilities[selectedCapability]).map((value) => <Dropdown.Item eventKey={value}>{value}</Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <button onClick={() => handleAddCapability(selectedCapability, selectedVersion)}> Create Capability </button>

                    </>
                }

            </div>
            <div>
                {
                    manifest.capabilities ? manifest.capabilities.map((component, componentIndex) => {

                        return (
                            <div>
                                <h1 id={componentIndex}>{component.name}          {component.version}</h1><button onClick={() => deleteCapability(componentIndex)}>Delete Capability</button>
                                <Dropdown onSelect={(eventKey) => { addDirective(componentIndex, eventKey) }}>
                                    <Dropdown.Toggle className="float-end" variant="success" id="dropdown-basic">
                                        Add Directive
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu >
                                        {manifest !== {} && Object.keys(capabilities[component.name][component.version]).map((value) => <Dropdown.Item eventKey={value}>{value}</Dropdown.Item>)}
                                    </Dropdown.Menu>
                                </Dropdown>

                                <div>
                                    {component.directives && component.directives.map((directive, directiveIndex) => {
                                        return (
                                            <div>
                                                {capabilities[component.name][component.version][Object.keys(directive)[0]] && <><Form
                                                    schema={capabilities[component.name][component.version][Object.keys(directive)[0]]}
                                                    formData={directive}
                                                    onChange={(formdata) => handleUpdateDirective(formdata, componentIndex, directiveIndex)}
                                                    validator={validator}
                                                    children={true}
                                                    dataDirectiveIndex={directiveIndex}
                                                />
                                                    <button onClick={() => deleteDirective(componentIndex, directiveIndex)}>Delete Directive</button></>}
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        )
                    }) : "No capabilities"
                }

                <div className="manifestText">
                    {loadingTextBox && <Spinner animation="border" size="sm" variant="primary" />}
                    <form>
                        {manifest && <textarea
                            className="form-control"
                            rows="10"
                            value={yaml.dump(manifest) || ""}
                            onChange={handleManifestTextChange}
                        >
                        </textarea>}
                    </form>
                </div>

            </div>
        </div>
    ) // Close Parent Return

} // App Function

// --> 