import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { AuthLoader } from "./components/common/authLoader/AuthLoader.tsx";
import { App as AntApp } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AntApp>
          <AuthLoader />
          <App />
        </AntApp>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
