import {
    ArchiveIcon,
    PinIcon,
    TrashIcon,
    PencilIcon,
    UnArchiveIcon,
    DeleteTrashIcon,
    UnTrashIcon,
} from "./Icons";
import { Interweave } from "interweave";
import {
    addToArchives,
    addToTrash,
    deleteFromArchive,
    deleteFromTrash,
    restoreFromArchive,
    restoreFromTrash,
    updateNote,
} from "store/allNotesSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setEditNoteDetails } from "store/editorSlice";
const Tag = ({ name }) => {
    return (
        <div className="rounded-full px-2 py-1 bg-gray-200 dark:bg-zinc-700 text-xs font-medium">
            {name}
        </div>
    );
};
export const Note = ({ note }) => {
    const { pathname: place } = useLocation();
    const dispatch = useDispatch();
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
            <div className="flex">
                <h1 className="text-xl font-semibold">{note.heading}</h1>
                {place === "/notes" && (
                    <button
                        onClick={() =>
                            dispatch(
                                updateNote({ ...note, pinned: !note.pinned })
                            )
                        }
                        className={`ml-auto  ${
                            note.pinned
                                ? "-rotate-45"
                                : "opacity-0 group-hover:opacity-100 hover:-rotate-45"
                        } transition-all delay-150`}>
                        <PinIcon className={`h-6 w-6`} />
                    </button>
                )}
            </div>

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
            <div className="flex items-center mt-auto   ">
                {/* Time Stamp */}
                <p className="text-xs cursor-default text-gray-500">
                    {note.created.toString()}
                </p>

                {/* Footer CTA */}
                <div className="flex ml-auto gap-2 opacity-0 group-hover:opacity-100 transition-opacity delay-150">
                    {(place === "/notes" || place.includes("tags")) && (
                        <>
                            <button
                                onClick={() =>
                                    dispatch(setEditNoteDetails(note))
                                }>
                                <PencilIcon className="h-5 w-5 hover:scale-110" />
                            </button>
                            <button
                                onClick={() => dispatch(addToArchives(note))}>
                                <ArchiveIcon className="h-5 w-5 hover:scale-110" />
                            </button>
                            <button onClick={() => dispatch(addToTrash(note))}>
                                <TrashIcon className="h-5 w-5 hover:scale-110" />
                            </button>
                        </>
                    )}
                    {place === "/archives" && (
                        <>
                            <button
                                onClick={() =>
                                    dispatch(restoreFromArchive(note))
                                }>
                                <UnArchiveIcon className="h-5 w-5 hover:scale-110" />
                            </button>
                            <button
                                onClick={() =>
                                    dispatch(deleteFromArchive(note))
                                }>
                                <DeleteTrashIcon className="h-5 w-5 hover:scale-110 text-red-500" />
                            </button>
                        </>
                    )}
                    {place === "/trash" && (
                        <>
                            <button
                                onClick={() =>
                                    dispatch(restoreFromTrash(note))
                                }>
                                <UnTrashIcon className="h-5 w-5 hover:scale-110" />
                            </button>
                            <button
                                onClick={() => dispatch(deleteFromTrash(note))}>
                                <DeleteTrashIcon className="h-5 w-5 hover:scale-110 text-red-500" />
                            </button>
                        </>
                    )}
                </div>
                <p className="text-xs font-bold text-zinc-600 dark:text-gray-200 px-2 py-1 bg-gray-200 dark:bg-zinc-700 ml-2 rounded-md">
                    {note.priority}
                </p>
            </div>
        </div>
    );
};
