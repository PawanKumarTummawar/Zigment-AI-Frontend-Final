// import 'react-json-editor-ajrm/es/styles/react-json-editor-ajrm.css';
import React from 'react';
import JSONEditor from 'react-json-editor-ajrm';


const JsonEditor = ({ jsonSchema, onChange }) => {
  return (
    <div>
      <JSONEditor
        placeholder={jsonSchema}
        onChange={(e) => onChange(e.jsObject)} // Update the parent state with the modified JSON
        theme="light_mitsuketa_tribute"
      />
    </div>
  );
};

export default JsonEditor;
