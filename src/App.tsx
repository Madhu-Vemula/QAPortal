import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./store/store";
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
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <AppRoutes />
        </GoogleOAuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          pauseOnHover
          closeOnClick
          draggable
          theme="colored"
        />
      </BrowserRouter>
    </Provider>
  )
}

export default App;
