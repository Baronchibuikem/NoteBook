import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../../assets/css/Login.css";
import { Link, Redirect } from "react-router-dom";
import { loginUser } from "../../store/actions/authActions";

export default function Login() {
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
      <Card className="container col-md-4 py-5 col-sm-12">
        <form onSubmit={handleSubmit(regSubmit)}>
          <CardContent>
            <Typography
              class="text-uppercase text-center font-weight-bold"
              style={{ fontSize: "20px" }}
            >
              Sign In
            </Typography>

            <TextField
              id="outlined-basic"
              label="Enter your email"
              variant="outlined"
              inputRef={register({ required: true })}
              name="email"
              type="email"
              fullWidth
            />
            <h6 className="text-left font-italic text-danger">
              {errors.email && errors.email.type === "required" && (
                <p>Email field is required</p>
              )}
            </h6>
            <TextField
              id="outlined-basic"
              label="Enter your password"
              variant="outlined"
              inputRef={register({ required: true })}
              name="password"
              type="password"
              className="my-3"
              fullWidth
            />
            <h6 className="text-left font-italic text-danger">
              {errors.password && errors.password.type === "required" && (
                <p>Password field is required</p>
              )}
            </h6>
            <CardActions>
              <Button
                disableElevation
                type="submit"
                style={{ backgroundColor: "green" }}
                className="mx-auto px-5 col-sm-12 text-light p-3"
              >
                Login
              </Button>
            </CardActions>
            <h6 className="text-center">
              Don't have a registered account? Click{" "}
              <Link exact to="/register">
                here
              </Link>{" "}
              to Register now
            </h6>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
