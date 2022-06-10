import { useEffect, useRef, useState, useMemo } from "react";
import JoditEditor from "jodit-react";
import { hideEditor, setBody, setHeading } from "store/editorSlice";
import { TagContainer } from "./TagsContainer";
import { PrioritySelector } from "./PrioritySelector";
import { ColorSelector } from "./ColorSelector";
import { ActionButtons } from "./ActionButtons";
import { EditorToggleButton } from "./EditorToggleButton";
import { useAppDispatch, useAppSelector } from "store/TypedExports";

type CustomDiv = { timeOutId: NodeJS.Timeout } & HTMLDivElement;

export const NoteEditor: React.FC = () => {
    const darkTheme = useAppSelector((state) => state.theme.darkTheme);
    const noteDetails = useAppSelector((state) => state.editor);
    const [newTag, setNewTag] = useState("");
    const editor = useRef<CustomDiv>(null!);
    const dispatch = useAppDispatch();
    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: "What's on your mind...?",
            theme: darkTheme ? "dark" : "light",
            toolbarButtonSize: "small",
        }),
        [darkTheme]
    );

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
            className="fixed w-10/12 sm:w-96 sm:bottom-14 bottom-10 sm:right-14 right-6 z-10 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-slate-300">
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

                {/* Body */}
                <JoditEditor
                    value={noteDetails.body}
                    config={config}
                    onBlur={(_newContent) => {}}
                    onChange={(newContent) => {
                        dispatch(setBody(newContent));
                    }}
                />

                {/* Tags Container */}
                <TagContainer
                    noteDetails={noteDetails}
                    newTag={newTag}
                    setNewTag={setNewTag}
                />

                {/* Priority and Color*/}
                <div className="flex items-center p-2">
                    <p className="text-xs font-semibold">Priority</p>
                    <PrioritySelector noteDetails={noteDetails} />
                    <ColorSelector noteDetails={noteDetails} />
                </div>

                {/* Action Button */}
                <ActionButtons
                    noteDetails={noteDetails}
                    setNewTag={setNewTag}
                />
            </div>

            <EditorToggleButton />
        </div>
    );
};
