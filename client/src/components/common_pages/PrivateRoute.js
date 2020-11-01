import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const params = useSelector((state) => ({
    authenticated: state.authentication.isAuthenticated,
  }));

  return (
    <Route
      {...rest}
      render={(props) => {
        if (params.authenticated === true) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
