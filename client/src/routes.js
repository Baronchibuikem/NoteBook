import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/authentication/Login";
import register from "./components/authentication/Registration";
import PrivateRoute from "./components/common_pages/PrivateRoute";
const BaseRouter = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={register} />
    {/* <PrivateRoute exact path="/:id" component={singlePoll} /> */}
  </Switch>
);
export default BaseRouter;
