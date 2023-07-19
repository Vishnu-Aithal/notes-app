import { ThemeSwitcher } from "components/Layout/ThemeSwitcher";
import { SignIn } from "components/Auth/SignIn";
import { toggleDarkTheme } from "store/themeSlice";
import { useLocation } from "react-router-dom";
import { SignUp } from "components/Auth/SignUp";
import { useAppDispatch, useAppSelector } from "store/TypedExports";

export const AuthPage: React.FC = () => {
    const darkTheme = useAppSelector((state) => state.theme.darkTheme);
    const dispatch = useAppDispatch();
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
