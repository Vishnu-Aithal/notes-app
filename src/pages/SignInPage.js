import { ThemeSwitcher } from "components/ThemeSwitcher";
import { SignIn } from "components/SignIn";
import { useTheme } from "contexts/ThemeContext";

export const SignInPage = () => {
    const { darkTheme, setDarkTheme } = useTheme();
    return (
        <div className={darkTheme ? "dark" : ""}>
            <div className="h-screen w-screen flex items-center justify-center relative bg-slate-50 dark:bg-zinc-700 animate-fade-in">
                <ThemeSwitcher
                    className={
                        "hover:cursor-pointer rounded-md group p-3 hover:scale-110 transition-all absolute top-5 right-5"
                    }
                    setDarkTheme={setDarkTheme}
                />
                <SignIn />
            </div>
        </div>
    );
};
