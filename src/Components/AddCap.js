import { useContext } from "react";
import Context from "../StateProvider";
import LoadCache from "./LoadCache";

const HandleAddCapability = (capability, version) => {
  const [manifest, setManifest] = useContext(Context).manifest
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

export default HandleAddCapability