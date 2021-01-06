import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/sections/authentication/Login";
import register from "./components/sections/authentication/Registration";
import PrivateRoute from "./components/sections/common_pages/PrivateRoute";
import dashboard from "./components/sections/dashboard/Dashboard";
const BaseRouter = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={register} />
    {/* <PrivateRoute exact path="/:id" component={singlePoll} /> */}
    <PrivateRoute exact path="/" component={dashboard} />
  </Switch>
);
export default BaseRouter;
