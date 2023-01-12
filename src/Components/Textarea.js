import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
// import {manifestContext} from '../App'
// import {manifest} from "../Capa"

// let mani = this.context
function renderManifestYaml() {
  // Render editor
  return (
    //<App manifest={manifest}></App>
    <AceEditor
      mode="yaml"
      theme="github"
      onChange={renderManifestYaml}
      name="manifestYaml"
      // value={mani.manifestContext}
    />
  )
}
export default renderManifestYaml






