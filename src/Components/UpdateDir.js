import { useContext } from "react";
import Context from "../StateProvider";

const HandleUpdateDirective = (formData, componentIndex, directiveIndex) => {
const [manifest,setManifest] = useContext(Context).manifest
    let m = { ...manifest }
    m.capabilities[componentIndex].directives[directiveIndex] = formData.formData;

    setManifest(m);

  }

  export default HandleUpdateDirective