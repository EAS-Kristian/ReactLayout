import { useContext } from "react";
import Context from "../StateProvider";
import LoadCache from "./LoadCache";



const AddDirective = (componentIndex, directiveName) => {
    const [manifest,setManifest] = useContext(Context).manifest

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

  export default AddDirective