import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Card from "./Cards";
import { toast } from "react-toastify";
import {
  getPosts,
  getPost,
  getCategories,
  addCategory,
} from "../../../store/actions/postActions";
import SinglePost from "./SinglePost";
import TextEditor from "./Editor";
import "../../../assets/css/GeneralStyles.css";

import TextField from "@material-ui/core/TextField";

function Dashboard() {
  const [addPost, setAddPost] = useState(false);
  const [loading, setLoading] = useState(false);

  // for fetching state
  const params = useSelector((state) => ({
    allpost: state.postreducer.posts,
    singlepost: state.postreducer.post,
    user: state.authentication.user,
  }));

  const dispatch = useDispatch();

  // hooks form
  const { register, handleSubmit, errors, watch, reset } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
    },
  });

  // for displaying post on render
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCategories());
  }, [dispatch]);

  const get_post = (id) => {
    setAddPost(false);
    dispatch(getPost(id));
  };

  console.log(addPost, "add post", params.singlepost, "single post");
  // this is used to dispatch a redux action with the neeeded login data
  const category = (data) => {
    setLoading(true);
    dispatch(
      addCategory(data, (data, error) => {
        if (error) {
          toast.error(
            error &&
              error.response &&
              error.response.data &&
              error.response.data.message
              ? error.response.data.message
              : "Error in connection"
          );
        } else {
          toast.success(data);
        }
        setLoading(false);
        reset();
      })
    );
  };

  return (
    <div className="backgroundColor">
      <div className="container-fluid mt-5 pt-5">
        <div className="row">
          <div
            className="col-md-4 container"
            style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
          >
            <h4 className="text-center mb-2">My notes</h4>
            <div className="row my-3">
              <div className="col-md-6">
                <button
                  onClick={() => setAddPost(!addPost)}
                  className="form-control bg-success text-light"
                >
                  Create Note
                </button>
              </div>
              <div className="col-md-6">
                <button
                  className="form-control bg-success text-light"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  Add Category
                </button>
                {/* Modal for adding a category */}
                <div
                  className="modal fade"
                  id="exampleModalCenter"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalCenterTitle"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <form onSubmit={handleSubmit(category)}>
                        <div className="modal-header">
                          <h5
                            className="modal-title"
                            id="exampleModalLongTitle"
                          >
                            Category Name
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <TextField
                            id="outlined-basic"
                            label="Enter category name"
                            variant="outlined"
                            inputRef={register({ required: true })}
                            name="name"
                            type="text"
                            fullWidth
                          />
                          <h6 className="text-left font-italic text-danger">
                            {errors.name && errors.name.type === "required" && (
                              <p>category name field is required</p>
                            )}
                          </h6>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="submit"
                            className="btn btn-success form-control"
                          >
                            Add Category
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* close of modal for adding a category */}
              </div>
            </div>

            {Array.isArray(params.allpost) && params.allpost.length
              ? params.allpost.map((post) => (
                  <div key={post._id}>
                    <Card
                      content={post.title}
                      category={post.category.name}
                      title={post.title}
                      id={post._id}
                      click={get_post}
                    />
                  </div>
                ))
              : ""}
          </div>
          <div
            className="col-md-8"
            style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
          >
            {params.singlepost !== null &&
            !addPost &&
            params.singlepost.owner._id === params.user._id ? (
              <SinglePost
                name={params.singlepost.name}
                text={params.singlepost.text}
                category={
                  params.singlepost !== null &&
                  params.singlepost.category !== null
                    ? params.singlepost.category.name
                    : ""
                }
              />
            ) : (
              <TextEditor />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
