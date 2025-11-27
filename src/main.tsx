import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "./i18n";
import "./index.css";
import { ThemeProvider } from "./components/layout/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);
