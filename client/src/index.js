import React from "react";
import ReactDom from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery"
import "mdbreact";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from 'redux-persist/integration/react'

ReactDom.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<div style={{ backgroundColor: "#f6f9fa" }}>
				<App />
			</div>
		</PersistGate>
	</Provider>,
	document.querySelector("#root")
);
