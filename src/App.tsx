import AppRoutes from "./routes/AppRoutes";
import {  useSelector } from "react-redux";
import "../src/styles/login-form.css"
import "../src/styles/buttons.css"
import "../src/styles/form-container.css"
import "../src/styles/main.css"
import "../src/styles/loader.css"
import "../src/styles/navbar.css"
import "../src/styles/custom-modal.css"
import "../src/styles/not-found.css"
import "../src/styles/custom-table.css"
import "../src/styles/card.css"
import "../src/styles/google-login.css"
import { useEffect } from "react";
import { useGetCurrentUserQuery } from "./services/authService";
import type { RootState } from "./store/store";

function App() {
  const token = useSelector((state: RootState) => state.auth.token);
  const { refetch } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });
  useEffect(() => {
    document.title = "Q&A Portal";
    if (token) refetch();
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", async () => {
        try {
           await navigator.serviceWorker.register("/sw.js");
        } catch (err) {
          console.error("Service Worker registration failed:", err);
        }
      });
    }
  }, [token, refetch]);

  return (
    <AppRoutes />
  )
}

export default App;
