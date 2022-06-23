import { IconType } from "assets/Icons/Icons";
import { NavLink } from "react-router-dom";

interface SideBarNavLinkProps {
    to: string;
    Icon: IconType;
    name: string;
    small?: true;
}

export const SideBarNavLink: React.FC<SideBarNavLinkProps> = ({
    to,
    Icon,
    name,
    small,
}) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center rounded-r-full sm:p-4 pl-4 py-4 group text-zinc-700 dark:text-slate-300 ${
                    isActive
                        ? " bg-amber-200 dark:bg-amber-700 dark:bg-opacity-50"
                        : "hover:bg-gray-300 hover:bg-opacity-50"
                }`
            }>
            <Icon
                className={`${
                    small ? "sm:w-3 sm:h-3 h-4 w-4" : "sm:w-6 sm:h-6 h-6 w-6"
                } ml-0 pr-1 sm:ml-3 mr-5 group-hover:scale-110 transition-transform stroke-2 flex-shrink-0`}
            />
            <p className="group-hover:translate-x-1 transition-transform w-0 sm:w-44 overflow-hidden">
                {name}
            </p>
        </NavLink>
    );
};
