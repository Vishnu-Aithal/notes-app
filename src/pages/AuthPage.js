import { ThemeSwitcher } from "components/ThemeSwitcher";
import { SignIn } from "components/SignIn";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkTheme } from "store/themeSlice";
import { useLocation } from "react-router-dom";
import { SignUp } from "components/SignUp";

export const AuthPage = () => {
    const darkTheme = useSelector((state) => state.theme.darkTheme);
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const setDarkTheme = () => dispatch(toggleDarkTheme());
    return (
        <div className={darkTheme ? "dark" : ""}>
            <div className="h-screen w-screen flex items-center justify-center relative bg-slate-50 dark:bg-zinc-700">
                <ThemeSwitcher
                    className={
                        "hover:cursor-pointer rounded-md group p-3 hover:scale-110 transition-all absolute top-5 right-5"
                    }
                    setDarkTheme={setDarkTheme}
                />
                {pathname === "/sign-in" ? <SignIn /> : <SignUp />}
            </div>
        </div>
    );
};
