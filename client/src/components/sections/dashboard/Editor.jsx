import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import "../../../assets/css/Dashboard.css";
import { useForm } from "react-hook-form";

// import the config here
import { config } from "../../../editorConfig";

const TextEditor = (props) => {
  const [addData, setAddData] = useState("");
  const [addName, setAddName] = useState("");
  const [addedData, setAddedData] = useState(0);
  const [showModal, setShowModal] = useState(false);

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
        {!addedData ? (
          <div>
            <input
              type="text"
              name="name"
              placeholder="Enter title here"
              className="form-control my-3 p-4"
              onChange={handleNameChange}
            />
            <CKEditor
              editor={ClassicEditor}
              data={addData}
              onChange={handleChange}
            />
          </div>
        ) : (
          <div className="ck-editor__editable ">
            {addedData ? ReactHtmlParser(addData) : null}
          </div>
        )}
        <div className="d-flex justify-content-between">
          <button
            className="form-control my-3 w-25 bg-dark text-light"
            onClick={() => setAddedData(!addedData)}
            data-toggle="modal"
            data-target=".bd-example-modal-lg"
            type="button"
          >
            {addedData ? "Hide Data" : "Show Data"}
          </button>
          <button
            className="form-control my-3 w-25 bg-dark text-light"
            type="submit"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TextEditor;
