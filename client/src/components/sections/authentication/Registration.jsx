import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

import "../../../assets/css/Login.css";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../../../store/actions/authActions";
import { useSelector, useDispatch } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Baron Chibuikem
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     // flexBasis: "33.33%",
//     flexShrink: 0,
//     color: "white",
//   },
//   secondaryHeading: {
//     fontSize: theme.typography.pxToRem(15),
//     color: theme.palette.text.secondary,
//   },
//   backgroundColor: {
//     backgroundColor: "green",
//   },
//   paddingBottom: {
//     marginBottom: "10px",
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

export default function Register() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const { register, handleSubmit, errors, watch } = useForm();

  // Here we are instantiating our dispatch action
  const dispatch = useDispatch();

  // This is used to dispatch a redux action with the needed registration data
  const regSubmit = (data) => {
    dispatch(
      registerUser({
        data,
      })
    );
  };

  const params = useSelector((state) => ({
    authenticated: state.authentication.isAuthenticated,
  }));
  // Here we are checking if our authenticated value from the state is true, it yes we redirect to the homepage
  if (params.authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className="center-content">
        <h3 className="container text-center">
          <u>
            JotterNote is a powerful note and record keeping appplication,
            <br /> focused on helping you
          </u>
        </h3>
        <ul className="list-unstyled h4 my-3">
          <li className="my-2">
            <i className="fa fa-check mr-3" aria-hidden="true"></i>
            Organize your information
          </li>
          <li className="my-2">
            <i class="fa fa-check mr-3" aria-hidden="true"></i>Interact with
            others
          </li>
          <li className="my-2">
            <i class="fa fa-check mr-3" aria-hidden="true"></i>Share your notes
            with us
          </li>
          <li className="my-2">
            <i class="fa fa-check mr-3" aria-hidden="true"></i>Create and keep a
            record of everything
          </li>
        </ul>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(regSubmit)}
          >
            {/* Enter your first name */}

            <TextField
              id="outlined-basic"
              label="first name"
              variant="outlined"
              inputRef={register({ required: true })}
              name="firstName"
              fullWidth
            />
            <h6 className="text-left font-italic text-danger">
              {errors.name && errors.name.type === "required" && (
                <p>First name is required</p>
              )}
            </h6>

            {/* Enter your last name */}

            <TextField
              id="outlined-basic"
              label="last name"
              margin="normal"
              variant="outlined"
              inputRef={register({ required: true })}
              name="lastName"
              fullWidth
            />
            <h6 className="text-left font-italic text-danger">
              {errors.first_name && errors.first_name.type === "required" && (
                <p>Last name is required</p>
              )}
            </h6>

            {/* Enter your email */}

            <TextField
              id="outlined-basic"
              label="Enter your email here"
              variant="outlined"
              fullWidth
              inputRef={register({ required: true })}
              name="email"
              type="email"
            />
            <h6 className="text-left font-italic text-danger">
              {errors.email && errors.email.type === "required" && (
                <p>Email field is required</p>
              )}
            </h6>

            {/* Enter your password */}

            <TextField
              id="outlined-basic"
              label="Enter your password"
              variant="outlined"
              inputRef={register({ required: true })}
              name="password"
              type="password"
              fullWidth
              className="my-2"
            />
            <h6 className="text-left font-italic text-danger">
              {errors.password && errors.password.type === "required" && (
                <p>Password field is required</p>
              )}
            </h6>

            {/* password confirmation */}

            <h6 className="text-left font-italic text-danger">
              {errors.password2 && errors.password2.type === "validate" && (
                <p>Passwords don't match</p>
              )}
            </h6>
            <TextField
              id="outlined-basic"
              label="Confirm your password"
              variant="outlined"
              name="password2"
              fullWidth
              inputRef={register({
                required: true,
                validate: (value) => {
                  return value === watch("password");
                },
              })}
              type="password"
            />
            <h6 className="text-left font-italic text-danger">
              {errors.password2 && errors.password2.type === "required" && (
                <p>Please confirm your password</p>
              )}
            </h6>
            <Button
              disableElevation
              className="mx-auto px-5 col-sm-12 p-3 text-light"
              type="submit"
              style={{ backgroundColor: "green" }}
            >
              {/* {params.status ? (
                  <div>
                    <span>Loading</span>
                  </div>
                ) : (
                  "Register"
                )} */}
              Register
            </Button>

            <h6 className="text-center mt-3">
              <Link exact to="/login" variant="body2">
                Already registered? then click here to Login now
              </Link>
            </h6>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
