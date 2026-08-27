import React from "react";
import { createRoot } from "react-dom/client";
import ResumeSite from "../app/ResumeSite";
import "../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ResumeSite />
  </React.StrictMode>,
);
