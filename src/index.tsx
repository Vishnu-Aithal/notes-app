import { createRoot } from "react-dom/client";
import "./index.css";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { ConditionalRouter } from "./pages/Routes";
import { Provider as StoreProvider } from "react-redux";
import { store } from "store/store";

// Call make Server
makeServer();

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <StoreProvider store={store}>
            <ConditionalRouter />
        </StoreProvider>
    </BrowserRouter>
);

// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     document.getElementById("root")
// );
