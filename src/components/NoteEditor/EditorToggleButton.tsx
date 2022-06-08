import { PlusIcon } from "assets/Icons/Icons";
import { useDispatch } from "react-redux";
import { toggleEditor } from "store/editorSlice";

export const EditorToggleButton = () => {
    const dispatch = useDispatch();
    return (
        <button
            onClick={() => dispatch(toggleEditor())}
            className="bg-amber-200 dark:bg-amber-800 p-2 rounded-full shadow-md absolute bottom-0 right-0 ">
            <PlusIcon className={"h-7 w-7"} />
        </button>
    );
};
