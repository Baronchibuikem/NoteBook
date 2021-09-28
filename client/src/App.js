import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import Navbar from "./components/sections/navigation/Navbar";

const App = () => {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <div className="">
          <div
            style={{
              backgroundColor: "#f6f9fa",
            }}
          >
            <BaseRouter />
          </div>
        </div>
      </Router>
    </Fragment>
  );
};

export default App;
