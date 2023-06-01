import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

//Importamos el Router para poder crear rutas en nuestra app.
import { BrowserRouter as Router } from "react-router-dom";

//Importamos el objeto provider de react-redux para que nuestra app pueda usar el store.
import { Provider } from "react-redux";
import store from "./redux/store"; //Nuestro store

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>
);
