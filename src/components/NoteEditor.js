import { useEffect, useRef, useState, useMemo } from "react";
import { PlusIcon } from "./Icons";
import JoditEditor from "jodit-react";
import { useDispatch, useSelector } from "react-redux";
import {
    addTag,
    hideEditor,
    setBody,
    setColor,
    setHeading,
    setPriority,
    toggleEditor,
} from "store/editorSlice";
import { addNewNote } from "store/allNotesSlice";

const Tag = ({ name }) => {
    return (
        <div className="rounded-full px-2 py-1 bg-gray-200 dark:bg-zinc-700 text-xs font-medium">
            {name}
        </div>
    );
};

export const NoteEditor = () => {
    const darkTheme = useSelector((state) => state.theme.darkTheme);
    const noteDetails = useSelector((state) => state.editor);
    const [newTag, setNewTag] = useState("");
    const editor = useRef(null);
    const dispatch = useDispatch();
    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: "What's on your mind...?",
            theme: darkTheme ? "dark" : "light",
            toolbarButtonSize: "small",
        }),
        [darkTheme]
    );

    const prepareNoteData = () => ({
        heading: noteDetails.heading,
        body: noteDetails.body,
        tags: noteDetails.tags,
        priority: noteDetails.priority,
        color: noteDetails.color,
        pinned: false,
        created: new Date().toString().slice(0, 25),
    });

    useEffect(() => {
        if (noteDetails.showEditor) editor.current.focus();
    }, [noteDetails.showEditor]);

    return (
        <div
            tabIndex={-1}
            onFocus={() => clearTimeout(editor.current.timeOutId)}
            onBlur={() =>
                (editor.current.timeOutId = setTimeout(
                    () => dispatch(hideEditor()),
                    0
                ))
            }
            ref={editor}
            className="fixed w-10/12 sm:w-4/12 sm:bottom-14 bottom-10 sm:right-14 right-6 z-10 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-slate-300">
            {/* Editor Window */}

            <div
                className={`${
                    noteDetails.showEditor ? "scale-100" : "scale-0"
                } origin-bottom-right flex flex-col p-2 absolute border-2 bottom-8 right-8 dark:border-zinc-700 shadow-xl rounded-md bg-inherit w-full`}>
                {/* Heading */}
                <input
                    value={noteDetails.heading}
                    onChange={(e) => dispatch(setHeading(e.target.value))}
                    className="p-2 text-lg font-semibold outline-none bg-inherit border-inherit w-full"
                    type="text"
                    placeholder="Note Heading"
                />
                <JoditEditor
                    value={noteDetails.body}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => {}} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => {
                        dispatch(setBody(newContent));
                    }}
                />

                {/* Tags Container */}
                <div className="flex items-center mt-2 gap-1">
                    <input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className="p-1 px-2 border rounded-full text-xs outline-none bg-inherit dark:border-zinc-600 w-20 "
                        type="text"
                        placeholder="New Tag"
                    />
                    {newTag && !noteDetails.tags.includes(newTag) && (
                        <button
                            onClick={() => {
                                dispatch(addTag(newTag));
                                setNewTag("");
                            }}
                            className="p-1 hover:bg-gray-200 rounded-full">
                            <PlusIcon className={"h-3 w-3"} />
                        </button>
                    )}
                    {noteDetails.tags.map((tag) => (
                        <Tag key={tag} name={tag} />
                    ))}
                </div>
                {/* Priority and Color*/}
                <div className="flex items-center p-2">
                    <p className="text-xs font-semibold">Priority</p>
                    <select
                        value={noteDetails.priority}
                        onChange={(e) => dispatch(setPriority(e.target.value))}
                        className="ml-2 text-xs font-semibold bg-inherit"
                        name="priority"
                        id="">
                        <option className="dark:bg-zinc-700" value="Low">
                            Low
                        </option>
                        <option className="dark:bg-zinc-700" value="Medium">
                            Medium
                        </option>
                        <option className="dark:bg-zinc-700" value="High">
                            High
                        </option>
                    </select>
                    <button
                        onClick={() => dispatch(setColor("red"))}
                        className={`ml-auto h-5 w-5 bg-red-500 rounded-md mx-1 ${
                            noteDetails.color === "red"
                                ? "border-2 scale-125 shadow-md border-zinc-600 dark:border-slate-200"
                                : ""
                        }`}></button>
                    <button
                        onClick={() => dispatch(setColor("yellow"))}
                        className={`h-5 w-5 bg-yellow-500 rounded-md mx-1 ${
                            noteDetails.color === "yellow"
                                ? "border-2 scale-125 shadow-md border-zinc-600 dark:border-slate-200"
                                : ""
                        }`}></button>
                    <button
                        onClick={() => dispatch(setColor("green"))}
                        className={`h-5 w-5 bg-green-500 rounded-md mx-1 ${
                            noteDetails.color === "green"
                                ? "border-2 scale-125 shadow-md border-zinc-600 dark:border-slate-200"
                                : ""
                        }`}></button>
                    <button
                        onClick={() => dispatch(setColor("blue"))}
                        className={`h-5 w-5 bg-blue-500 rounded-md mx-1 ${
                            noteDetails.color === "blue"
                                ? "border-2 scale-125 shadow-md border-zinc-600 dark:border-slate-200"
                                : ""
                        }`}></button>
                    <button
                        onClick={() => dispatch(setColor("default"))}
                        className={`h-5 w-5 border rounded-md mx-1 ${
                            noteDetails.color === "default"
                                ? "border-2 scale-125 shadow-md border-zinc-600 dark:border-slate-200"
                                : ""
                        }`}></button>
                </div>

                {/* Action Button */}
                {noteDetails.mode === "new" ? (
                    <button
                        disabled={!(noteDetails.heading && noteDetails.body)}
                        onClick={() => {
                            dispatch(addNewNote(prepareNoteData()));
                        }}
                        className="px-3 py-1 rounded-md bg-amber-300 dark:bg-amber-800 ml-auto m-2 disabled:pointer-events-none disabled:bg-gray-500">
                        Add Note
                    </button>
                ) : (
                    <button className="px-3 py-1 rounded-md bg-amber-300 dark:bg-amber-800 ml-auto m-2">
                        Save Note
                    </button>
                )}
            </div>

            <button
                onClick={() => dispatch(toggleEditor())}
                className="bg-amber-200 dark:bg-amber-800 p-2 rounded-full shadow-md absolute bottom-0 right-0 ">
                <PlusIcon className={"h-7 w-7"} />
            </button>
        </div>
    );
};
