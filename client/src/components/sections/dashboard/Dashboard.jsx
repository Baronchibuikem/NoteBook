import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, getPost } from "../../../store/actions/postActions";
import Card from "../../libs/Cards";
import SinglePost from "./SinglePost";

function Dashboard() {
  const params = useSelector((state) => ({
    allpost: state.postreducer.posts,
    singlepost: state.postreducer.post,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const get_post = (id) => {
    dispatch(getPost(id));
    // singlePostPage();
    console.log("button for single post clicked" + id);
  };

  const singlePostPage = params.singlepost ? (
    <SinglePost name={params.singlepost.name} />
  ) : null;

  return (
    <div className="container-fluid mt-5 pt-5">
      <div className="row">
        <div
          className="col-md-4 container"
          style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
        >
          <h4>This will be used to display the list of post</h4>
          {params.allpost.map((post) => (
            <div key={post._id}>
              <Card
                text={post.text}
                category={post.category.name}
                name={post.name}
                id={post._id}
                click={get_post}
              />
            </div>
          ))}
        </div>
        <div className="col-md-8">
          {params.singlepost !== null ? (
            <SinglePost
              name={params.singlepost.name}
              text={params.singlepost.text}
              category={params.singlepost.category.name}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
