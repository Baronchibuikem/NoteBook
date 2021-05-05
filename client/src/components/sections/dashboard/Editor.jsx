import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import "../../../assets/css/GeneralStyles.css";
import { addPost } from "../../../store/actions/postActions";

// import the config here
// import { config } from "../../../editorConfig";

const TextEditor = (props) => {
  const [addText, setAddText] = useState("");
  const [addTitle, setAddTitle] = useState("");
  const [addCategory, setAddCategory] = useState("");
  const [addedData, setAddedData] = useState(0);
  const [displayError, setDisplayError] = useState(null);

  const dispatch = useDispatch();

  // for fetching state
  const params = useSelector((state) => ({
    allcategory: state.postreducer.categories,
    userId: state.authentication.user.id,
  }));

  const submit = (e) => {
    e.preventDefault();
    if (addCategory === "") {
      setDisplayError("Category cannot be None");
    } else {
      const data = {
        name: addTitle,
        text: addText,
        category: addCategory,
        owner: params.userId,
      };

      dispatch(addPost(data));
      // reset all the input to empty
      setAddTitle("");
      setAddText("");
      setAddCategory("");
    }
  };

  const handleChange = (e) => {
    setAddText(e.target.value);
  };

  const handleTitleChange = (e) => {
    setAddTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setDisplayError(null);
    setAddCategory(e.target.value);
  };

  return (
    <div>
      <form onSubmit={submit}>
        {
          <div>
            <select
              id=""
              className="form-control"
              onChange={handleCategoryChange}
            >
              <option value="None" selected>
                None Selected{" "}
              </option>
              {params.allcategory && params.allcategory.length >= 0
                ? params.allcategory.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                : "No category added yet"}
            </select>
            {displayError ? (
              <div className="text-danger text-center">{displayError} </div>
            ) : null}
            <input
              type="text"
              name="name"
              required
              placeholder="Enter title here"
              className="form-control my-3 p-4"
              onChange={handleTitleChange}
            />
            <textarea
              required
              rows="24"
              maxLength="5000"
              className="form-control "
              onChange={handleChange}
            ></textarea>
          </div>
        }
        <div className="d-flex justify-content-between">
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
