import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { ThemeProvider } from "./components/layout/ThemeProvider";
import "./i18n";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);
