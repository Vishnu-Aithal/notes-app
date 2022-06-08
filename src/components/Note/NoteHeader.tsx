import { PinIcon } from "assets/Icons/Icons";
import { useDispatch } from "react-redux";
import { updateNote } from "store/allNotesSlice";

export const NoteHeader = ({ note, place }) => {
    const dispatch = useDispatch();
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
