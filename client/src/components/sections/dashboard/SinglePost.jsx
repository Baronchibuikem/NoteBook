import React from "react";
import { makeStyles } from "@material-ui/core/";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#BDBDBD",
    minHeight: "100vh",
  },
});

function SinglePost(props) {
  const classes = useStyles();

  return (
    <div className="mt-5" className={classes.root}>
      <h5>{props.name}</h5>
      <span>{props.category}</span>
      <p className="mt-5">{props.text}</p>
    </div>
  );
}

export default SinglePost;
