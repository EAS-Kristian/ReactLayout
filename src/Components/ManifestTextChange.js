import { useContext } from "react";
import Context from "../StateProvider";
import LoadCache from "./LoadCache";
import yaml from 'js-yaml';


const HandleManifestTextChange = event => {
    const [setManifest] = useContext(Context).manifest
    const [setYamlError] = useContext(Context).yamlError
    try {
      const hat = yaml.load(event.target.value);
      setManifest(hat);
      LoadCache(hat);
      setYamlError("");
    } catch (e) {
      setYamlError("Invalid YAML format")
    }

  }

export default HandleManifestTextChange