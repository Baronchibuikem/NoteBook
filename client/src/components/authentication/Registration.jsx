import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import "../../assets/css/Login.css";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../../store/actions/authActions";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    // flexBasis: "33.33%",
    flexShrink: 0,
    color: "white",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  backgroundColor: {
    backgroundColor: "green",
  },
  paddingBottom: {
    marginBottom: "10px",
  },
}));

export default function Register() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

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
    <div
      style={{
        backgroundColor: "#282c34",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        className={classes.root}
        className="container col-md-4 py-5 col-sm-12 sm-screen"
      >
        <form onSubmit={handleSubmit(regSubmit)}>
          <CardContent>
            <Typography
              class="text-uppercase text-center font-weight-bold"
              style={{ fontSize: "20px" }}
            >
              Sign up
            </Typography>
            {/* Enter your fullname */}

            <Typography className={classes.heading}>Full Name</Typography>

            <TextField
              id="outlined-basic"
              label="Enter your fullname here"
              variant="outlined"
              className={classes.root}
              inputRef={register({ required: true })}
              name="name"
              fullWidth
            />
            <h6 className="text-left font-italic text-danger">
              {errors.name && errors.name.type === "required" && (
                <p>Full name is required</p>
              )}
            </h6>

            {/* Enter your email */}

            <Typography className={classes.heading}>Email</Typography>

            <TextField
              id="outlined-basic"
              label="Enter your email here"
              variant="outlined"
              className={classes.root}
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

            <Typography className={classes.heading}>Password</Typography>

            <TextField
              id="outlined-basic"
              label="Enter your password"
              variant="outlined"
              className={classes.root}
              inputRef={register({ required: true })}
              name="password"
              type="password"
            />
            <h6 className="text-left font-italic text-danger">
              {errors.password && errors.password.type === "required" && (
                <p>Password field is required</p>
              )}
            </h6>

            {/* password confirmation */}

            <Typography className={classes.heading}>
              Confirm Password
            </Typography>
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
              className={classes.root}
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
            <CardActions>
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
            </CardActions>
            <h6 className="text-center">
              Already registered? then click{" "}
              <Link exact to="/login">
                here
              </Link>{" "}
              to Login now
            </h6>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
