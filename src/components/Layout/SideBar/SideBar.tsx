import { useEffect, useState } from "react";
import {
    PencilIcon,
    ArchiveIcon,
    TrashIcon,
    KanbanIcon,
} from "assets/Icons/Icons.js";
import { useSelector } from "react-redux";
import { SideBarNavLink } from "./SideBarNavLink";
import { TagSubMenu } from "./TagSubMenu";

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
                    <TagSubMenu tags={tags} />
                </li>

                <li>
                    <SideBarNavLink
                        to={"/archives"}
                        Icon={ArchiveIcon}
                        name={"Archive"}
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
                        to={"/kanban"}
                        Icon={KanbanIcon}
                        name={"Kanban"}
                    />
                </li>
            </ul>
        </aside>
    );
};
