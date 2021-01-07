import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// import the config here
import { config } from "../../../editorConfig";

const TextEditor = ({ onSubmit }) => {
  const [body, setBody] = useState("");

  // and then plug it in here
  //   ClassicEditor.defaultConfig = config;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ body });
  };

  return (
    <div className="mt-5 pt-5">
      <form onSubmit={handleSubmit}>
        <CKEditor
          editor={ClassicEditor}
          onChange={(event, editor) => {
            // const data = editor.getData();
            const data = "<p>Hello from CKEditor 5!</p>";
            setBody(data);
          }}
        />
        <button type="submit">Submit</button>
        <CKEditor />?
      </form>
    </div>
  );
};

export default TextEditor;
