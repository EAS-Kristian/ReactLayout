import {createContext} from 'react'
import {useState} from "react";

const Context = createContext()
function StateProvider(props) {
    const [capabilities, setCapabilities] = useState({});
    const [loadingTextBox, setLoadingTextBox] = useState(false);
    const [selectedCapability, setSelectedCap] = useState(undefined);
    const [selectedVersion, setSelectedVersion] = useState(undefined);
    const [invalidCapabilities, setInValidCapabilities] = useState([]);
    const [invalidDirectives, setInValidDirectives] = useState([]);
    const [yamlError, setYamlError] = useState("");
    const [digger, setDigger] = useState('hello')

    return (
        <Context.Provider value={{ capabilities: [capabilities, setCapabilities], loadingTextBox: [loadingTextBox, setLoadingTextBox], selectedCapability: [selectedCapability, setSelectedCap], selectedVersion: [selectedVersion, setSelectedVersion], invalidCapabilities: [invalidCapabilities, setInValidCapabilities], invalidDirectives: [invalidDirectives, setInValidDirectives], yamlError: [yamlError, setYamlError], digger: [digger, setDigger] }}>
            {props.children}
        </Context.Provider>
    )
}
export {StateProvider}
export default Context