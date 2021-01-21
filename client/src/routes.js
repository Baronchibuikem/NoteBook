import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/sections/authentication/Login";
import register from "./components/sections/authentication/Registration";
import PrivateRoute from "./components/libs/PrivateRoute";
import dashboard from "./components/sections/dashboard/Dashboard";

import TextEditor from "./components/sections/dashboard/Editor";
import HomePage from "./components/sections/staticPages/HomePage";
const BaseRouter = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={register} />
    <Route exact path="/editor" component={TextEditor} />
    <Route exact path="/home" component={HomePage} />
    <PrivateRoute exact path="/" component={dashboard} />
  </Switch>
);
export default BaseRouter;
