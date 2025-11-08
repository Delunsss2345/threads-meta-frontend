import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import { store } from "./store";

export default function App() {
  return (
    <BrowserRouter>
      <ReduxProvider store={store}>
        <AppRoutes />
      </ReduxProvider>
    </BrowserRouter>
  );
}
