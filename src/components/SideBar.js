import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    PencilIcon,
    ArchiveIcon,
    UserIcon,
    TrashIcon,
    TagIcon,
} from "components/Icons.js";
import { useSelector } from "react-redux";

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
                className={`sm:ml-2 ml-1 overflow-hidden transition-all text-xs space-y-1 ${
                    subMenuCollapse ? "h-0" : "h-0 sm:h-auto"
                }`}>
                {tags.map((tag) => (
                    <li className="mt-1" key={tag}>
                        <SideBarNavLink
                            to={`/tags/${tag}`}
                            Icon={TagIcon}
                            name={tag.toUpperCase()}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};

export const SideBar = () => {
    const [tags, setTags] = useState([]);
    const notes = useSelector((state) => state.allNotes.notes);

    useEffect(() => {
        const getTags = () => {
            let tags = notes.reduce(
                (tags, note) => [...tags, ...note.tags],
                []
            );
            tags = Array.from(new Set(tags));
            return ["ALL", ...tags];
        };
        setTags(getTags(notes));
    }, [notes, setTags]);
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
                    <TagSubMenu tags={tags} />
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
