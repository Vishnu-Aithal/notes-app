import { MoonIcon } from "assets/Icons/Icons";
export const ThemeSwitcher = ({ setDarkTheme, className }) => {
    return (
        <button
            className={className}
            onClick={() => setDarkTheme((theme) => !theme)}>
            <MoonIcon
                className={
                    "w-5 h-5 fill-black dark:fill-white dark:rotate-180 transition-all"
                }
            />
        </button>
    );
};
