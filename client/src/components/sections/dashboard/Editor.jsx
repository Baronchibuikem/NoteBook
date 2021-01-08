import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import "../../../assets/css/Dashboard.css";
import { useForm } from "react-hook-form";

// import the config here
import { config } from "../../../editorConfig";

const TextEditor = ({ onSubmit }) => {
  const [addData, setAddData] = useState("");
  const [addName, setAddName] = useState("");
  const [addedData, setAddedData] = useState(0);

  // and then plug it in here
  //   ClassicEditor.defaultConfig = config;

  // hooks form
  const { register, handleSubmit, errors } = useForm();

  const submit = (e) => {
    e.preventDefault();
    const data = {
      name: addName,
      text: addData,
    };
    console.log(data);
  };

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setAddData(data);
    console.log(data);
  };

  const handleNameChange = (e) => {
    setAddName(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <form onSubmit={submit}>
        <input
          type="text"
          name="name"
          placeholder="Enter title here"
          className="form-control my-3 p-4"
          //   value={addName}
          onChange={handleNameChange}
        />
        <CKEditor
          editor={ClassicEditor}
          data={addData}
          onChange={handleChange}
        />
        <div className="d-flex justify-content-around-">
          <button
            className="form-control my-3 w-25"
            onClick={() => setAddedData(!addedData)}
          >
            {addedData ? "Hide Data" : "Show Data"}
          </button>
          <button className="form-control my-3 w-25" type="submit">
            submit
          </button>
        </div>
      </form>
      {addedData ? ReactHtmlParser(addData) : null}
    </div>
  );
};

export default TextEditor;
