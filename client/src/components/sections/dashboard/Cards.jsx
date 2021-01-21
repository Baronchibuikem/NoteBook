import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { deletePost } from "../../../store/actions/postActions";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 10,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  // For truncating the number of text to 30
  const truncate = (str) => {
    return str.length > 100 ? str.substring(0, 100) + "..." : str;
  };

  const delete_post = (id) => {
    console.log(id);
    dispatch(deletePost(id));
  };

  return (
    <Card className={classes.root && classes.pos}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.name}
        subheader={props.category}
      />
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {truncate(props.text)}
        </Typography>
      </CardContent>
      <div className="d-flex justify-content-between my-3">
        <div>
          <Button
            size="small"
            className="ml-3"
            onClick={() => {
              props.click(props.id);
            }}
          >
            Learn More
          </Button>
        </div>
        <div>
          <i
            className="fa fa-trash text-danger mr-5"
            style={{ cursor: "pointer" }}
            onClick={() => {
              delete_post(props.id);
            }}
          ></i>
        </div>
      </div>
    </Card>
  );
}
