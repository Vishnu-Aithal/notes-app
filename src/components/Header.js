import { LogOutIcon, MoonIcon, NoteIcon } from "./Icons";
import { Link } from "react-router-dom";
import { useTheme } from "contexts/ThemeContext";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const Header = ({}) => {
    const { setDarkTheme } = useTheme();
    return (
        <header className="flex p-3 items-center h-fit border-b-2 text-gray-600 dark:bg-zinc-800 dark:text-slate-300 dark:border-zinc-700">
            {/* <button className="p-2 mx-2 rounded-md hover:bg-slate-100 hover:text-black hover:scale-110">
                <MenuIcon className="h-6 w-6" />
            </button> */}
            <Link
                to={"/home"}
                className="flex flex-shrink-0 items-center ml-3 ">
                <NoteIcon
                    className={"h-10 w-10 text-amber-400 dark:text-amber-700"}
                />
                <h1 className="text-base font-medium sm:min-w-fit mx-2 sm:text-2xl w-0 sm:w-auto overflow-hidden">
                    Notes App
                </h1>
            </Link>

            <ThemeSwitcher
                className={
                    "ml-auto hover:cursor-pointer rounded-md group p-3 hover:scale-110 transition-all"
                }
                setDarkTheme={setDarkTheme}
            />
            <Link
                to={"/"}
                className=" hover:cursor-pointer  hover:bg-gray-100 dark:hover:bg-zinc-600 rounded-md group p-3">
                <LogOutIcon className="h-5 w-5 overflow-visible" />
            </Link>
        </header>
    );
};
