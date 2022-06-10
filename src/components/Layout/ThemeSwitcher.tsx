import { MoonIcon } from "assets/Icons/Icons";

interface ThemeSwitcherProps {
    setDarkTheme: () => void;
    className: string;
}
export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
    setDarkTheme,
    className,
}) => {
    return (
        <button className={className} onClick={setDarkTheme}>
            <MoonIcon
                className={
                    "w-5 h-5 fill-black dark:fill-white dark:rotate-180 transition-all"
                }
            />
        </button>
    );
};
