import { ContentLayout } from "components/Layout/ContentLayout";
import { Note } from "components/Note/Note";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAppSelector } from "store/TypedExports";
import { NoteType } from "types/Note";

const TagLink: React.FC<{ tag: string }> = ({ tag }) => (
    <NavLink
        className={({ isActive }) =>
            `px-3 py-1 border dark:border-zinc-600 dark:text-slate-200 rounded-md hover:bg-gray-200 hover:bg-opacity-50 ${
                isActive ? "bg-amber-200 dark:bg-amber-800" : ""
            }`
        }
        to={`/tags/${tag}`}>
        {tag}
    </NavLink>
);

export const TagsPage: React.FC = () => {
    const notes = useAppSelector((state) => state.allNotes.notes);
    const [notesToDisplay, setNotesToDisplay] = useState([] as NoteType[]);
    const [tags, setTags] = useState([] as string[]);
    const { tag: tagUrl } = useParams();

    useEffect(() => {
        const getTags = () => {
            let tags = notes.reduce(
                (tags, note) => [...tags, ...note.tags],
                [] as string[]
            );
            tags = Array.from(new Set(tags));
            return ["ALL", ...tags];
        };
        setTags(getTags());
    }, [notes, setTags]);

    useEffect(() => {
        setNotesToDisplay(
            tagUrl === "ALL"
                ? notes
                : notes.filter((note) => note.tags.includes(tagUrl || ""))
        );
    }, [notes, tagUrl]);
    return (
        <ContentLayout>
            <div className="w-full p-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <TagLink key={tag} tag={tag} />
                ))}
            </div>
            {notesToDisplay.map((note) => (
                <Note key={note._id} note={note} />
            ))}
        </ContentLayout>
    );
};
