import React from "react";
// import "./init";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { StyledEngineProvider } from "@mui/material";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HydrationWrapper from "./components/shared/HydrationWrapper";
import { ToastProvider } from "react-toast-notifications";
import { store } from "./constant/redux/store";

const persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider placement="top-center" autoDismiss>
          <StyledEngineProvider injectFirst>
            {/* <HydrationWrapper> */}
            <BrowserRouter>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </BrowserRouter>
            {/* </HydrationWrapper> */}
          </StyledEngineProvider>
        </ToastProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
