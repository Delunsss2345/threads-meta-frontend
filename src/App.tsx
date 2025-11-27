import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import ScrollTop from "./components/common/ScrollTop";
import AppRoutes from "./components/layout/AppRoutes";
import AuthProvider from "./components/layout/AuthProvider";
import { ModalProvider } from "./components/layout/ModalProvider";
import { persist, store } from "./store";
export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <PersistGate persistor={persist}>
        <ReduxProvider store={store}>
          <Toaster position="bottom-center" />
          <AppRoutes />
          <AuthProvider />
          <ModalProvider />
        </ReduxProvider>
      </PersistGate>
    </BrowserRouter>
  );
}
