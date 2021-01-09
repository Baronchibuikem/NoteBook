import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import "../../../assets/css/Dashboard.css";
import { addPost } from "../../../store/actions/postActions";

// import the config here
// import { config } from "../../../editorConfig";

const TextEditor = (props) => {
  const [addText, setAddText] = useState("");
  const [addName, setAddName] = useState("");
  const [addCategory, setAddCategory] = useState("");
  const [addedData, setAddedData] = useState(0);

  // and then plug it in here
  //   ClassicEditor.defaultConfig = config;

  const dispatch = useDispatch();

  // for fetching state
  const params = useSelector((state) => ({
    allcategory: state.postreducer.categories,
    userId: state.authentication.user.id,
  }));

  const submit = (e) => {
    e.preventDefault();
    const data = {
      name: addName,
      text: addText,
      category: addCategory,
      owner: params.userId,
    };
    console.log(data);
    dispatch(addPost(data));
  };

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setAddText(data);
  };

  const handleNameChange = (e) => {
    setAddName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setAddCategory(e.target.value);
  };

  return (
    <div>
      <form onSubmit={submit}>
        {!addedData ? (
          <div>
            <select
              id=""
              className="form-control"
              onChange={handleCategoryChange}
            >
              {params.allcategory.map((category) => (
                <option key={category._id}>{category.name}</option>
              ))}
            </select>
            <input
              type="text"
              name="name"
              placeholder="Enter title here"
              className="form-control my-3 p-4"
              onChange={handleNameChange}
            />
            <CKEditor
              editor={ClassicEditor}
              data={addText}
              onChange={handleChange}
            />
          </div>
        ) : (
          <div className="ck-editor__editable mt-4">
            {addedData ? ReactHtmlParser(addText) : null}
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
            {addedData ? "View form" : "Preview"}
          </button>
          <button
            className="form-control my-3 w-25 bg-dark text-light"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TextEditor;
