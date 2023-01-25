import { createContext } from 'react'
import { useState } from "react";
import yaml from 'js-yaml';
import axios from "axios";

const Context = createContext()
function StateProvider(props) {
    const [capabilities, setCapabilities] = useState({});
    const [loadingTextBox, setLoadingTextBox] = useState(false);
    const [selectedCapability, setSelectedCap] = useState(undefined);
    const [selectedVersion, setSelectedVersion] = useState(undefined);
    const [invalidCapabilities, setInValidCapabilities] = useState([]);
    const [invalidDirectives, setInValidDirectives] = useState([]);
    const [yamlError, setYamlError] = useState("");
    const [manifest, setManifest] = useState({
        "capabilities": [
        ]
    })


    const HandleAddCapability = (capability, version) => {
        let m = { ...manifest }
        if (m.capabilities) {
            m.capabilities.push({
                "name": capability,
                "version": version,
                "directives": []
            });
        }
        setManifest(m);
        LoadCache(m)

    }

    const LoadCache = async (manifestPasted) => {
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
        }
        else {
            let tempObj = { "capabilities": [] }
            setManifest(tempObj)
            LoadCache(yaml.load)
        }

    }

    const DeleteCapability = (componentIndex) => {
        let tempCode = { ...manifest }
        delete tempCode.capabilities[componentIndex]
        tempCode.capabilities = tempCode.capabilities.filter(function () { return true });
        setManifest(tempCode)
    }

    const DeleteDirective = (componentIndex, directiveIndex) => {
        let tempCode = { ...manifest }
        delete tempCode.capabilities[componentIndex].directives[directiveIndex]
        tempCode.capabilities[componentIndex].directives = tempCode.capabilities[componentIndex].directives.filter(function () { return true });
        setManifest(tempCode)

    }

    const AddDirective = (componentIndex, directiveName) => {

        let tempCode = { ...manifest }
        if (tempCode.capabilities[componentIndex].directives) {
            tempCode.capabilities[componentIndex].directives.push({ [directiveName]: {} })
        }
        else {
            console.log("No Directives")
        }
        setManifest(tempCode);
        LoadCache(manifest)
    }

    const HandleManifestTextChange = event => {
        try {
            const hat = yaml.load(event.target.value);
            setManifest(hat);
            LoadCache(hat);
            setYamlError("");
        } catch (e) {
            setYamlError("Invalid YAML format")
        }

    }

    const HandleUpdateDirective = (formData, componentIndex, directiveIndex) => {
        let m = { ...manifest }
        m.capabilities[componentIndex].directives[directiveIndex] = formData.formData;
        setManifest(m);

    }

    const MoveCapability = (direction, componentIndex) => {
        let tempObj = manifest
        let thisCapability = tempObj.capabilities[componentIndex]

        if (direction === "UP" && (tempObj.capabilities[componentIndex - 1] != undefined)) {
            let targetCapability = tempObj.capabilities[componentIndex - 1]
            tempObj.capabilities[componentIndex] = targetCapability
            tempObj.capabilities[componentIndex - 1] = thisCapability
        }
        if (direction === "DOWN" && (tempObj.capabilities[componentIndex + 1] != undefined)) {
            let targetCapability = tempObj.capabilities[componentIndex + 1]
            tempObj.capabilities[componentIndex] = targetCapability
            tempObj.capabilities[componentIndex + 1] = thisCapability
        }
        setManifest(tempObj)
        LoadCache(tempObj)

    }

    const MoveDirective = (direction, componentIndex, directiveIndex) => {
        let tempObj = manifest
        let thisDirective = tempObj.capabilities[componentIndex].directives[directiveIndex]

        if (direction === "UP" && (tempObj.capabilities[componentIndex].directives[directiveIndex - 1] !== undefined)) {
            let targetDirective = tempObj.capabilities[componentIndex].directives[directiveIndex - 1]
            tempObj.capabilities[componentIndex].directives[directiveIndex] = targetDirective
            tempObj.capabilities[componentIndex].directives[directiveIndex - 1] = thisDirective
        }
        if (direction === "DOWN" && (tempObj.capabilities[componentIndex].directives[directiveIndex + 1] !== undefined)) {
            let targetDirective = tempObj.capabilities[componentIndex].directives[directiveIndex + 1]
            tempObj.capabilities[componentIndex].directives[directiveIndex] = targetDirective
            tempObj.capabilities[componentIndex].directives[directiveIndex + 1] = thisDirective
        }
        setManifest(tempObj)
        LoadCache(tempObj)

    }


    return (
        <Context.Provider value={{
            capabilities: [capabilities, setCapabilities], loadingTextBox: [loadingTextBox, setLoadingTextBox], selectedCapability: [selectedCapability, setSelectedCap], selectedVersion: [selectedVersion, setSelectedVersion],
            invalidCapabilities: [invalidCapabilities, setInValidCapabilities], invalidDirectives: [invalidDirectives, setInValidDirectives], yamlError: [yamlError, setYamlError],
            manifest: [manifest, setManifest], HandleAddCapability: HandleAddCapability, LoadCache: LoadCache, DeleteCapability: DeleteCapability,
            DeleteDirective: DeleteDirective, AddDirective: AddDirective, HandleManifestTextChange: HandleManifestTextChange, HandleUpdateDirective: HandleUpdateDirective, MoveCapability: MoveCapability, MoveDirective: MoveDirective
        }}>
            {props.children}
        </Context.Provider>
    )
}
export { StateProvider }
export default Context