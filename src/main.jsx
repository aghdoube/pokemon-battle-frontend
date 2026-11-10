import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PokemonProvider } from "./context/PokemonContext";
import "./app.css";

import React from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PokemonProvider>
      <App />
    </PokemonProvider>
  </StrictMode>,
);
