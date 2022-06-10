import { Interweave } from "interweave";
import { useLocation } from "react-router-dom";
import { NoteHeader } from "./NoteHeader";
import { NoteFooter } from "./NoteFooter";
import { NoteType } from "types/Note";
const Tag: React.FC<{ name: string }> = ({ name }) => {
    return (
        <div className="rounded-full px-2 py-1 bg-gray-200 dark:bg-zinc-700 text-xs font-medium">
            {name}
        </div>
    );
};
export const Note: React.FC<{ note: NoteType }> = ({ note }) => {
    const { pathname: place } = useLocation();
    const bgColor = {
        red: "bg-red-300",
        yellow: "bg-yellow-300",
        blue: "bg-blue-300",
        green: "bg-green-300",
        default: "",
    };
    const borderColor = {
        red: "border-red-300",
        yellow: "border-yellow-300",
        blue: "border-blue-300",
        green: "border-green-300",
        default: "border-gray-300",
    };
    return (
        <div
            className={
                "animate-fade-in flex flex-col h-fit border-1 sm:w-96 w-72 rounded-lg p-4 text-gray-600 hover:shadow-md dark:shadow-zinc-700 transition-shadow group dark:bg-zinc-800 dark:text-slate-300 " +
                borderColor[note.color] +
                " " +
                bgColor[note.color]
            }>
            {/* Header */}
            <NoteHeader note={note} place={place} />

            {/* Body */}
            <div className="my-4">
                <Interweave content={note.body} />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 items-center my-2">
                {note.tags.map((tag) => (
                    <Tag key={tag} name={tag} />
                ))}
            </div>

            {/* Footer */}
            <NoteFooter note={note} place={place} />
        </div>
    );
};
