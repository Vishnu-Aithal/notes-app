import { useDispatch, useSelector } from "react-redux";
import {
    setNewestFirstFilter,
    setOldestFirstFilter,
} from "store/filteredNotesSlice";

export const DateSort = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filteredNotes.filter);
    return (
        <div className="p-4 border-b-1 border-gray-200 dark:border-zinc-700">
            <p className="font-bold mb-2">Sort By</p>
            <div className="ml-2 text-sm font-medium flex flex-col space-y-2 ">
                <label htmlFor="newest-first">
                    <input
                        onChange={(e) =>
                            e.target.checked && dispatch(setNewestFirstFilter())
                        }
                        className="mr-1"
                        type="radio"
                        name="date-sort"
                        id="newest-first"
                        checked={filter.newestFirst}
                    />
                    Newest First
                </label>

                <label htmlFor="oldest-first">
                    <input
                        onChange={(e) =>
                            e.target.checked && dispatch(setOldestFirstFilter())
                        }
                        className="mr-1"
                        type="radio"
                        name="date-sort"
                        id="oldest-first"
                        checked={!filter.newestFirst}
                    />
                    Oldest First
                </label>
            </div>
        </div>
    );
};
