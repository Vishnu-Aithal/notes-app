import { PinIcon } from "assets/Icons/Icons";
import { updateNote } from "store/allNotesSlice";
import { useAppDispatch } from "store/TypedExports";
import { NoteType } from "types/Note";

interface NoteHeaderProps {
    note: NoteType;
    place: string;
}

export const NoteHeader: React.FC<NoteHeaderProps> = ({ note, place }) => {
    const dispatch = useAppDispatch();
    return (
        <div className="flex">
            <h1 className="text-xl font-semibold">{note.heading}</h1>
            {place === "/notes" && (
                <button
                    onClick={() =>
                        dispatch(updateNote({ ...note, pinned: !note.pinned }))
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
    );
};
