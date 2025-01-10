import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="677234801026-8hfqfcrr9aqmibnbtr8nu00rgup1f9vg.apps.googleusercontent.com">
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  </GoogleOAuthProvider>
);
