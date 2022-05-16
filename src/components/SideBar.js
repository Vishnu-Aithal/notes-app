import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
    PencilIcon,
    ArchiveIcon,
    UserIcon,
    TrashIcon,
    TagIcon,
} from "components/Icons.js";

const SideBarNavLink = ({ to, Icon, name }) => {
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

const TagSubMenu = ({ tags }) => {
    const [subMenuCollapse, setSubMenuCollapse] = useState(true);
    return (
        <>
            <div onClick={() => setSubMenuCollapse((state) => !state)}>
                <SideBarNavLink to={"/tags"} Icon={TagIcon} name="Tags" />
            </div>
            <ul
                className={`sm:ml-2 ml-1 overflow-hidden transition-all text-xs ${
                    subMenuCollapse ? "h-0" : "h-0 sm:h-auto"
                }`}>
                {tags.map((tag, index) => (
                    <li key={index}>
                        <SideBarNavLink
                            to={"/tags/" + tag.id}
                            Icon={TagIcon}
                            name={tag.name}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};

export const SideBar = () => {
    return (
        <aside className="h-full w-fit overflow-auto dark:bg-zinc-800 dark:text-slate-300">
            <ul className="py-2 text-sm font-medium space-y-1">
                <li>
                    <SideBarNavLink
                        to={"/notes"}
                        Icon={PencilIcon}
                        name={"Notes"}
                    />
                </li>

                <li>
                    <SideBarNavLink
                        to={"/archives"}
                        Icon={ArchiveIcon}
                        name={"Archive"}
                    />
                </li>

                <li>
                    <TagSubMenu
                        tags={[
                            { id: 0, name: "tag1" },
                            { id: 1, name: "tag2" },
                            { id: 2, name: "tag3" },
                            { id: 3, name: "tag4" },
                        ]}
                    />
                </li>

                <li>
                    <SideBarNavLink
                        to={"/trash"}
                        Icon={TrashIcon}
                        name={"Trash"}
                    />
                </li>

                <li>
                    <SideBarNavLink
                        to={"/profile"}
                        Icon={UserIcon}
                        name={"Profile"}
                    />
                </li>
            </ul>
        </aside>
    );
};
