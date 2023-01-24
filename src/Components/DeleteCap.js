import { useContext } from "react";
import Context from "../StateProvider";

const DeleteCapability = (componentIndex) => {
    const [manifest,setManifest] = useContext(Context).manifest
    let tempCode = { ...manifest }
    delete tempCode.capabilities[componentIndex]
    tempCode.capabilities = tempCode.capabilities.filter(function () { return true });
    setManifest(tempCode)
  }
  
  export default DeleteCapability