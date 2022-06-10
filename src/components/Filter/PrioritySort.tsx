import {
    addPriorityToFilter,
    removePriorityFromFilter,
} from "store/filteredNotesSlice";
import { useAppDispatch, useAppSelector } from "store/TypedExports";
import { NotePriority } from "types/Note";

export const PrioritySort: React.FC = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector((state) => state.filteredNotes.filter);
    const priorities: NotePriority[] = ["Low", "Medium", "High"];
    return (
        <div className="p-4 border-b-1 border-gray-200 dark:border-zinc-700">
            <p className="font-bold mb-2">Filter By Priority</p>
            <div className="ml-2 text-sm font-medium flex flex-col space-y-2">
                {priorities.map((priority) => (
                    <label key={priority} htmlFor={priority}>
                        <input
                            onChange={(e) =>
                                e.target.checked
                                    ? dispatch(addPriorityToFilter(priority))
                                    : dispatch(
                                          removePriorityFromFilter(priority)
                                      )
                            }
                            className="mr-1"
                            type="checkbox"
                            name="tags"
                            id={priority}
                            checked={filter.priorities.includes(priority)}
                            value={priority}
                        />
                        {priority}
                    </label>
                ))}
            </div>
        </div>
    );
};
