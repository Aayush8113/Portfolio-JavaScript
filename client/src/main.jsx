import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Context Providers
import { SoundProvider } from "./context/SoundContext";

// --- 🖥️ SYSTEM UTILS ---
const initializeSystemSignature = () => {
  if (import.meta.env.PROD) {
    console.clear();
    const styleTitle =
      "background: #10b981; color: black; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;";
    const styleVer =
      "background: #0f172a; color: #3b82f6; font-weight: bold; padding: 4px 8px; border-radius: 0 4px 4px 0;";
    const styleAuth =
      "color: #94a3b8; font-family: monospace; font-size: 10px; margin-top: 5px;";

    console.log("%c SYSTEM ONLINE %c v2.5.0 ", styleTitle, styleVer);
    console.log("%c ARCHITECTED BY AAYUSH TRIPATHI ", styleAuth);
  }
};

// Initialize
initializeSystemSignature();

// --- 🚀 ROOT RENDER ---
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* SoundProvider wraps App to ensure audio context availability globally */}
      <SoundProvider>
        <App />
      </SoundProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
