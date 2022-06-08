import { NavLink } from "react-router-dom";

export const SideBarNavLink = ({ to, Icon, name }) => {
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
                className={
                    "sm:w-6 sm:h-6 h-8 w-8 ml-3 mr-5 group-hover:scale-110 transition-transform stroke-2"
                }
            />{" "}
            <p className="group-hover:translate-x-1 transition-transform w-0 sm:w-44 overflow-hidden">
                {name}
            </p>
        </NavLink>
    );
};
