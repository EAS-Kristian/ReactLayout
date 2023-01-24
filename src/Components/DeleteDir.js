import { useContext } from "react";
import Context from "../StateProvider";

const DeleteDirective = (componentIndex, directiveIndex) => {
    const [manifest,setManifest] = useContext(Context).manifest
    let tempCode = { ...manifest }
    delete tempCode.capabilities[componentIndex].directives[directiveIndex]
    tempCode.capabilities[componentIndex].directives = tempCode.capabilities[componentIndex].directives.filter(function () { return true });
    setManifest(tempCode)

  }

  export default DeleteDirective