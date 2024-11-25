// main.tsx or index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./security/AuthProvider"


const container = document.getElementById("root");
const root = createRoot(container!); // Use the non-null assertion operator if using TypeScript

root.render(
  <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
</React.StrictMode>
);
