import { useDispatch, useSelector } from "react-redux";
import {
    addPriorityToFilter,
    removePriorityFromFilter,
} from "store/filteredNotesSlice";

export const PrioritySort = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filteredNotes.filter);
    const priorities = ["Low", "Medium", "High"];
    return (
        <div className="p-4 border-b-1 border-gray-200 dark:border-zinc-700">
            <p className="font-bold mb-2">Filter By Priority</p>
            <div className="ml-2 text-sm font-medium flex flex-col space-y-2">
                {priorities.map((priority) => (
                    <label key={priority} htmlFor={priority}>
                        <input
                            onChange={(e) =>
                                e.target.checked
                                    ? dispatch(
                                          addPriorityToFilter(e.target.value)
                                      )
                                    : dispatch(
                                          removePriorityFromFilter(
                                              e.target.value
                                          )
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
