import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
// import {manifestContext} from '../App'
//import {manifest} from "../Capa"
import "../Capa";




function renderManifestYaml() {

  return (
    <div>
      <AceEditor
        mode="yaml"
        theme="github"
        onChange={renderManifestYaml}
        name="manifestYaml"
      />
      </div>
  )
}
export default renderManifestYaml






