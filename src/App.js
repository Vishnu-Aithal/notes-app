import { Outlet } from "react-router-dom";
import { Header } from "./components/Layout/Header";
import { SideBar } from "./components/Layout/SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { NoteEditor } from "components/NoteEditor/NoteEditor";
import { useEffect } from "react";
import { getAllNotes } from "store/allNotesSlice";

function App() {
    const darkTheme = useSelector((state) => state.theme.darkTheme);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    useEffect(() => {
        if (isLoggedIn) dispatch(getAllNotes());
    }, [isLoggedIn, dispatch]);
    return (
        <div
            className={`h-screen w-screen flex flex-col transition-colors duration-300  ${
                darkTheme ? "dark" : ""
            }`}>
            <Header />
            <div className="flex h-full w-full overflow-auto dark:bg-zinc-800">
                <SideBar />
                <Outlet />
                <NoteEditor />
            </div>
        </div>
    );
}

export default App;
