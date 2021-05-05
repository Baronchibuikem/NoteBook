import React, { Suspense } from "react";
import ReactDom from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery";
import "mdbreact";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./components/libs/error-boundary";
import PageLoader from "./components/libs/page-loader.component";

const PageLoading = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <PageLoader />
    </div>
  );
};

ReactDom.render(
  <Provider store={store}>
    <ErrorBoundary>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<PageLoading />}>
          <ToastContainer />
          <App />
        </Suspense>
      </PersistGate>
    </ErrorBoundary>
  </Provider>,
  document.querySelector("#root")
);
