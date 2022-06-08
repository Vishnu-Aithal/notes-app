import { useDispatch } from "react-redux";
import { setPriority } from "store/editorSlice";

export const PrioritySelector = ({ noteDetails }) => {
    const dispatch = useDispatch();
    return (
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
    );
};
