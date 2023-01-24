import { useContext } from "react";
import Context from "../StateProvider";
import axios from "axios";
import yaml from 'js-yaml';

const LoadCache = async (manifestPasted) => {
    const [capabilities, setCapabilities] = useContext(Context).capabilities;
    const [setInValidCapabilities] = useContext(Context).invalidCapabilities;
    const [setInValidDirectives] = useContext(Context).invalidDirectives;
    const [setManifest] = useContext(Context).manifest;
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

export default LoadCache