import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import LanguageProvider from "./components/LanguageProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </LanguageProvider>
  </StrictMode>
);
