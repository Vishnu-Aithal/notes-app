import { useDispatch } from "react-redux";
import { addNewNote, updateNote } from "store/allNotesSlice";
import { resetEditor } from "store/editorSlice";

export const ActionButtons = ({ noteDetails, newTag, setNewTag }) => {
    const dispatch = useDispatch();
    const prepareNewNoteData = () => ({
        heading: noteDetails.heading,
        body: noteDetails.body,
        tags: noteDetails.tags,
        priority: noteDetails.priority,
        color: noteDetails.color,
        pinned: false,
        created: new Date().toString().slice(0, 25),
    });
    const prepareEditNoteData = () => ({
        _id: noteDetails.editNoteId,
        heading: noteDetails.heading,
        body: noteDetails.body,
        tags: noteDetails.tags,
        priority: noteDetails.priority,
        color: noteDetails.color,
    });
    return noteDetails.mode === "new" ? (
        <button
            disabled={!(noteDetails.heading && noteDetails.body)}
            onClick={() => {
                dispatch(addNewNote(prepareNewNoteData()));
                setNewTag("");
            }}
            className="px-3 py-1 rounded-md bg-amber-300 dark:bg-amber-800 ml-auto m-2 disabled:pointer-events-none disabled:bg-gray-500">
            Add Note
        </button>
    ) : (
        <div className="flex">
            <button
                onClick={() => dispatch(resetEditor())}
                className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-700 ml-auto m-2">
                Cancel
            </button>
            <button
                onClick={() => {
                    dispatch(updateNote(prepareEditNoteData()));
                    setNewTag("");
                }}
                className="px-3 py-1 rounded-md bg-amber-300 dark:bg-amber-800 m-2">
                Save Note
            </button>
        </div>
    );
};
