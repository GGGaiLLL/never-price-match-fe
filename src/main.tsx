import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { AuthLoader } from "./components/AuthLoader.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthLoader />
      <App />
    </ApolloProvider>
  </StrictMode>
);
