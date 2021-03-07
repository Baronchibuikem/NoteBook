import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import "../../../assets/css/Login.css";
import { Link, Redirect } from "react-router-dom";
import { loginUser } from "../../../store/actions/authActions";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {/* <Link color="inherit" href="#"> */}
      Baron Chibuikem {""}
      {/* </Link>{" "} */}
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

export default function Login() {
  const classes = useStyles();

  // Here we are instantiating our dispatch action
  const dispatch = useDispatch();

  // hooks form
  const { register, handleSubmit, errors } = useForm();

  // this is used to dispatch a redux action with the neeeded login data
  const regSubmit = (data) => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  const params = useSelector((state) => ({
    errors: state.error_reducer.error,
    isAuthenticated: state.authentication.isAuthenticated,
  }));

  if (params.isAuthenticated === true) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className="center-content">
        <h1>Become more productive with JotterNote</h1>
        <h4> JotterNote helps you stay ontop your ideas and content...</h4>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(regSubmit)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              inputRef={register({ required: true })}
              type="email"
            />
            <h6 className="text-left font-italic text-danger">
              {errors.email && errors.email.type === "required" && (
                <p>Email field is required</p>
              )}
            </h6>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={register({ required: true })}
            />
            <h6 className="text-left font-italic text-danger">
              {errors.password && errors.password.type === "required" && (
                <p>Password field is required</p>
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
              Login
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}

              <h6 className="text-center mt-2">
                <Link exact to="/register">
                  Don't have an account? Sign Up
                </Link>{" "}
              </h6>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
