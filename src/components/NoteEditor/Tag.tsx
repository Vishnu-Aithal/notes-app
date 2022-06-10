import { CloseIcon } from "../../assets/Icons/Icons";
import { useDispatch } from "react-redux";
import { removeTag } from "store/editorSlice";

export const Tag: React.FC<{ name: string }> = ({ name }) => {
    const dispatch = useDispatch();
    return (
        <div className="rounded-full px-2 py-1 flex items-center gap-1 bg-gray-200 dark:bg-zinc-700 text-xs font-medium">
            <p>{name}</p>
            <button
                onClick={() => dispatch(removeTag(name))}
                className="hover:bg-gray-500 rounded-full p-1">
                <CloseIcon className={"h-3 w-3"} />
            </button>
        </div>
    );
};
