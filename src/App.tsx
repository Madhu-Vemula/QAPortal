import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
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
import { logout } from "./store/authSlice";

function App() {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch()
  const { refetch } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });
  useEffect(() => {
    document.title = "Q&A Portal";
    const refetchUser = async () => {
      if (token) {
        try {
          await refetch().unwrap();
        }
        catch (error: any) {
          if (error.data.message === "Session expired. Please login again.") {
            dispatch(logout())
          }
          console.error('Google Login Failed:', error.data.message);
        }
      }
    }
    refetchUser()
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
