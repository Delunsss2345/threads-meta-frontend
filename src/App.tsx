import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import AppRoutes from "./components/AppRoutes";
import AuthProvider from "./components/AuthProvider";
import { ModalProvider } from "./components/ModalProvider";
import ScrollTop from "./components/ScrollTop";
import { persist, store } from "./store";
export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />

      <PersistGate persistor={persist}>
        <ReduxProvider store={store}>
          <AppRoutes />
          <AuthProvider />
          {/* <Toaster richColors /> */}
          <ModalProvider />
        </ReduxProvider>
      </PersistGate>
    </BrowserRouter>
  );
}
