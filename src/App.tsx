import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import AppRoutes from "./components/AppRoutes";
import { persist, store } from "./store";
export default function App() {
  return (
    <BrowserRouter>
      <PersistGate persistor={persist}>
        <ReduxProvider store={store}>
          <AppRoutes />
        </ReduxProvider>
      </PersistGate>
    </BrowserRouter>
  );
}
