import { PlusIcon } from "assets/Icons/Icons";
import { toggleEditor } from "store/editorSlice";
import { useAppDispatch } from "store/TypedExports";

export const EditorToggleButton: React.FC = () => {
    const dispatch = useAppDispatch();
    return (
        <button
            onClick={() => dispatch(toggleEditor())}
            className="bg-amber-200 dark:bg-amber-800 p-2 rounded-full shadow-md absolute bottom-0 right-0 ">
            <PlusIcon className={"h-7 w-7"} />
        </button>
    );
};
