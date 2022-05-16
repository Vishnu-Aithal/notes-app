import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

function App() {
    const darkTheme = useSelector((state) => state.theme.darkTheme);
    return (
        <div
            className={`h-screen w-screen flex flex-col transition-colors duration-300  ${
                darkTheme ? "dark" : ""
            }`}>
            <Header />
            <div className="flex h-full w-full overflow-auto dark:bg-zinc-800">
                <SideBar />
                <Outlet />
            </div>
        </div>
    );
}

export default App;
