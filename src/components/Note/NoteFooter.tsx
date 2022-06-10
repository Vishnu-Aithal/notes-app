import {
    ArchiveIcon,
    DeleteTrashIcon,
    PencilIcon,
    TrashIcon,
    UnArchiveIcon,
    UnTrashIcon,
} from "assets/Icons/Icons";
import {
    addToArchives,
    addToTrash,
    deleteFromArchive,
    deleteFromTrash,
    restoreFromArchive,
    restoreFromTrash,
} from "store/allNotesSlice";
import { setEditNoteDetails } from "store/editorSlice";
import { useAppDispatch } from "store/TypedExports";
import { NoteType } from "types/Note";

interface NoteFooterProps {
    note: NoteType;
    place: string;
}
export const NoteFooter: React.FC<NoteFooterProps> = ({ note, place }) => {
    const dispatch = useAppDispatch();
    return (
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
                            onClick={() => dispatch(setEditNoteDetails(note))}>
                            <PencilIcon className="h-5 w-5 hover:scale-110" />
                        </button>
                        <button onClick={() => dispatch(addToArchives(note))}>
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
                            onClick={() => dispatch(restoreFromArchive(note))}>
                            <UnArchiveIcon className="h-5 w-5 hover:scale-110" />
                        </button>
                        <button
                            onClick={() => dispatch(deleteFromArchive(note))}>
                            <DeleteTrashIcon className="h-5 w-5 hover:scale-110 text-red-500" />
                        </button>
                    </>
                )}
                {place === "/trash" && (
                    <>
                        <button
                            onClick={() => dispatch(restoreFromTrash(note))}>
                            <UnTrashIcon className="h-5 w-5 hover:scale-110" />
                        </button>
                        <button onClick={() => dispatch(deleteFromTrash(note))}>
                            <DeleteTrashIcon className="h-5 w-5 hover:scale-110 text-red-500" />
                        </button>
                    </>
                )}
            </div>
            <p className="text-xs font-bold text-zinc-600 dark:text-gray-200 px-2 py-1 bg-gray-200 dark:bg-zinc-700 ml-2 rounded-md">
                {note.priority}
            </p>
        </div>
    );
};
