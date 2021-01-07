import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../../store/actions/postActions";
import Card from "../../libs/Cards";

function Dashboard() {
  const params = useSelector((state) => ({
    allpost: state.postreducer.posts,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <div className="container-fluid mt-5 pt-5">
      <div className="row">
        <div
          className="col-md-4 container"
          style={{ overflowY: "scroll", height: "calc(100vh - 127px)" }}
        >
          <h4>This will be used to display the list of post</h4>
          {params.allpost.map((post) => (
            <Card
              text={post.text}
              category={post.category.name}
              name={post.name}
            />
          ))}
        </div>
        <div className="col-md-8">This will be used to add Test</div>
      </div>
    </div>
  );
}

export default Dashboard;
