import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, getPost } from "../../../store/actions/postActions";
import Card from "../../libs/Cards";
import SinglePost from "./SinglePost";
import TextEditor from "./Editor";

function Dashboard() {
  const [addPost, setAddPost] = useState(false);

  const params = useSelector((state) => ({
    allpost: state.postreducer.posts,
    singlepost: state.postreducer.post,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const get_post = (id) => {
    setAddPost(false);
    dispatch(getPost(id));
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
          <h4 className="text-center mb-2">My notes</h4>
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
          <button onClick={() => setAddPost(!addPost)}>Create Note</button>
          {params.singlepost !== null && !addPost ? (
            <SinglePost
              name={params.singlepost.name}
              text={params.singlepost.text}
              category={params.singlepost.category.name}
            />
          ) : (
            <TextEditor />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
