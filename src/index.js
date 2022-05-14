import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { ConditionalRouter } from "./pages/Routes";
import { ThemeProvider } from "contexts/ThemeContext";

// Call make Server
makeServer();

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <ThemeProvider>
            <ConditionalRouter />
        </ThemeProvider>
    </BrowserRouter>
);

// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     document.getElementById("root")
// );
