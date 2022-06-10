import { HeroImage } from "assets/images/HeroImage";
import { ThemeSwitcher } from "components/Layout/ThemeSwitcher";
import { toggleDarkTheme } from "store/themeSlice";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/TypedExports";

export const HomePage: React.FC = () => {
    const darkTheme = useAppSelector((state) => state.theme.darkTheme);
    const dispatch = useAppDispatch();
    const setDarkTheme = () => dispatch(toggleDarkTheme());
    return (
        <div className={darkTheme ? "dark" : ""}>
            <div className="flex h-screen w-screen relative dark:bg-zinc-800 lg:px-32 px-4 bg-slate-50 overflow-hidden">
                <ThemeSwitcher
                    className={
                        "hover:cursor-pointer rounded-md group p-3 hover:scale-110 transition-all absolute top-5 right-5"
                    }
                    setDarkTheme={setDarkTheme}
                />
                <div className="sm:w-1/2 w-full h-full flex flex-col animate-move-in-right text-zinc-600 dark:text-zinc-400 py-16">
                    <h1 className="text-5xl font-bold text-amber-500">
                        The Notes App
                    </h1>
                    <h2 className="text-3xl font-bold  mt-auto text">
                        Meet your modern
                        <span className="text-amber-500 block">
                            {" "}
                            Note taking App
                        </span>
                    </h2>
                    <h3 className="text-xl mt-6 font-medium  w-3/5">
                        Manage your daily tasks and workflow in a modern way and
                        boost your efficiency without any efforts
                    </h3>
                    <Link
                        to={"/sign-up"}
                        className="bg-amber-500 hover:bg-zinc-600 hover:text-slate-100 dark:text-slate-100 hover:scale-110 text-lg w-fit py-2 px-6 rounded-md font-bold mt-auto">
                        Join Now
                    </Link>

                    <Link
                        to={"/sign-in"}
                        className="text-zinc-500 mt-2 font-semibold text-lg group w-fit">
                        Already have an account?{" "}
                        <span className="group-hover:text-amber-500 group-hover:translate-x-4 inline-block">
                            Sign-In
                        </span>
                    </Link>
                </div>

                <HeroImage className="animate-move-in-top sm:w-1/3 lg:w-1/2 w-10/12 opacity-40 sm:opacity-100 h-full sm:py-20 absolute sm:static left-40 top-48 pointer-events-none" />
            </div>
        </div>
    );
};
