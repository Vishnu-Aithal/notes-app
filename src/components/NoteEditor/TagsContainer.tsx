import { PlusIcon } from "assets/Icons/Icons";
import { SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { addTag, EditorState } from "store/editorSlice";
import { Tag } from "./Tag";

interface TagContainerProps {
    noteDetails: EditorState;
    newTag: string;
    setNewTag: React.Dispatch<SetStateAction<string>>;
}

export const TagContainer: React.FC<TagContainerProps> = ({
    noteDetails,
    newTag,
    setNewTag,
}) => {
    const dispatch = useDispatch();
    return (
        <div className="flex flex-wrap items-center mt-2 gap-1">
            <input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value.toUpperCase())}
                className="p-1 px-2 border rounded-full text-xs outline-none bg-inherit dark:border-zinc-600 w-20 "
                type="text"
                placeholder="New Tag"
            />
            {newTag && !noteDetails.tags.includes(newTag) && (
                <button
                    onClick={() => {
                        dispatch(addTag(newTag.replaceAll(" ", "-")));
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
    );
};
