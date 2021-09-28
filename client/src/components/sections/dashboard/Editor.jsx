import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import "../../../assets/css/GeneralStyles.css";
import { addPost } from "../../../store/actions/postActions";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { CustomSelect } from "../../libs/custom-select.component";

// import the config here
// import { config } from "../../../editorConfig";

const TextEditor = (props) => {
  const [addCategory, setAddCategory] = useState("");

  const dispatch = useDispatch();

  // for fetching state
  const params = useSelector((state) => ({
    allcategory: state.postreducer.categories,
    userId: state.authentication.user._id,
  }));

  // hooks form
  const { register, handleSubmit, errors, watch, reset } = useForm({
    mode: "all",
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
  });

  const values = watch();

  const submitPost = (data) => {
    data.owner = params.userId;
    dispatch(addPost(data));
    // reset all the input to empty
    reset();
  };

  const handleCategoryChange = (event) => {
    console.log(event.target.value);
    setAddCategory(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitPost)}>
        {
          <div>
            <CustomSelect
              label="Select a category"
              name="category"
              customRef={register({
                required: {
                  value: true,
                  message: "Required!",
                },
              })}
              fullWidth
              onChange={handleCategoryChange}
              value={values.category}
              error={errors?.category?.message}
            >
              {params.allcategory?.map((category) => (
                <option value={category._id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </CustomSelect>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Post Title"
              name="title"
              value={values.title}
              inputRef={register({ required: true })}
            />
            <TextField
              required
              margin="normal"
              multiline
              rows={25}
              fullWidth
              name="content"
              variant="outlined"
              label="Content"
              value={values.content}
              inputRef={register({ required: true })}
            />
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
