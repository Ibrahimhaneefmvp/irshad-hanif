import React from "react";
import { createRoot } from "react-dom/client";
import IrshadHanif from "./IrshadHanif.jsx";  // Fixed: Valid name, added .jsx
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <IrshadHanif />  // Fixed: Matches the import name
  </React.StrictMode>
);
