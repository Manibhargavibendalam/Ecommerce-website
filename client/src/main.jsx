
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <Provider store={store}>
      <App />
      <Toaster 
        toastOptions={{
          classNames: {
            success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0',
            error: 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-0',
          },
        }}
      />
  </Provider>
    
  </BrowserRouter>
);
