
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { useTheme } from "contexts/ThemeContext";

function App() {
    const { darkTheme } = useTheme();
    return (
        <div
            className={`h-screen w-screen flex flex-col transition-colors duration-300 animate-fade-in ${
                darkTheme ? "dark" : ""
            }`}>
            <Header />
            <div className="flex h-full w-full overflow-auto">
                <SideBar />
                <Outlet />
            </div>
        </div>
    );



export default App;
