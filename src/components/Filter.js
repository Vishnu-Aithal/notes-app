import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addPriorityToFilter,
    addTagToFilter,
    processFilter,
    removePriorityFromFilter,
    removeTagFromFilter,
    resetFilters,
    setNewestFirstFilter,
    setOldestFirstFilter,
    setSearchTerm,
} from "store/filteredNotesSlice";
import { CloseIcon, FilterIcon } from "./Icons";

export const Filter = () => {
    const [showFilter, setShowFilter] = useState(false);
    const ref = useRef();
    const dispatch = useDispatch();
    const { filter, unFilteredNotes } = useSelector(
        (state) => state.filteredNotes
    );

    const [tags, setTags] = useState([]);
    const priorities = ["Low", "Medium", "High"];

    useEffect(() => {
        const getTags = () => {
            let tags = unFilteredNotes.reduce(
                (tags, note) => [...tags, ...note.tags],
                []
            );
            tags = Array.from(new Set(tags));
            return tags;
        };
        setTags(getTags(unFilteredNotes));
    }, [unFilteredNotes, setTags]);

    useEffect(() => ref.current.focus(), [showFilter]);

    useEffect(() => {
        dispatch(processFilter());
    }, [filter, dispatch, unFilteredNotes]);

    return (
        <div className="w-full text-center relative">
            <input
                value={filter.searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                type="search"
                className=" bg-gray-100 dark:bg-zinc-700 p-2 rounded-md focus:bg-white dark:focus:bg-zinc-600 focus:shadow-md focus:border-2 focus:border-gray-200 dark:focus:border-none focus:outline-none lg:w-1/3 w-2/3"
                placeholder="Search Headings..."
            />
            <button
                className={`align-middle ml-2 ${
                    showFilter ? "pointer-events-none" : ""
                }`}
                onClick={() => setShowFilter(true)}>
                <FilterIcon className={"h-5 w-5 text-zinc-500"} />
            </button>
            <div
                ref={ref}
                tabIndex="-1"
                onFocus={() => clearTimeout(ref.current.timeOutId)}
                onBlur={() =>
                    (ref.current.timeOutId = setTimeout(
                        () => setShowFilter(false),
                        0
                    ))
                }
                className={`${
                    showFilter ? "opacity-100" : "scale-0 opacity-0"
                } origin-top-right flex flex-col border-1 border-gray-200 dark:border-zinc-700 rounded-md sm:w-96 w-72 text-left text-zinc-700 dark:text-zinc-300 absolute top-100 left-1/2 -translate-x-1/2 translate-y-2 z-10 bg-white dark:bg-zinc-800 shadow-md dark:shadow-zinc-700`}>
                <div className="flex w-full border-b-1 p-4 text-xl font-bold border-gray-200 dark:border-zinc-700">
                    <h1 className="">Sort & Filter Notes</h1>{" "}
                    <button
                        className="ml-auto hover:scale-110"
                        onClick={() => setShowFilter(false)}>
                        <CloseIcon className={"h-5 w-5"} />
                    </button>
                </div>
                {/* Sort By Date */}
                <div className="p-4 border-b-1 border-gray-200 dark:border-zinc-700">
                    <p className="font-bold mb-2">Sort By</p>
                    <div className="ml-2 text-sm font-medium flex flex-col space-y-2 ">
                        <label htmlFor="newest-first">
                            <input
                                onChange={(e) =>
                                    e.target.checked &&
                                    dispatch(setNewestFirstFilter())
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
                                    e.target.checked &&
                                    dispatch(setOldestFirstFilter())
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
                {/* Filter By Priority */}
                <div className="p-4 border-b-1 border-gray-200 dark:border-zinc-700">
                    <p className="font-bold mb-2">Filter By Tags</p>
                    <div className="ml-2 text-sm font-medium flex flex-col space-y-2">
                        {priorities.map((priority) => (
                            <label key={priority} htmlFor={priority}>
                                <input
                                    onChange={(e) =>
                                        e.target.checked
                                            ? dispatch(
                                                  addPriorityToFilter(
                                                      e.target.value
                                                  )
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
                                    checked={filter.priorities.includes(
                                        priority
                                    )}
                                    value={priority}
                                />
                                {priority}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Filter By Tags */}
                <div className="p-4 border-b-1 border-gray-200 dark:border-zinc-700">
                    <p className="font-bold mb-2">Filter By Tags</p>
                    <div className="ml-2 text-sm font-medium flex flex-col space-y-2">
                        {tags.map((tag) => (
                            <label key={tag} htmlFor={tag}>
                                <input
                                    onChange={(e) =>
                                        e.target.checked
                                            ? dispatch(
                                                  addTagToFilter(e.target.value)
                                              )
                                            : dispatch(
                                                  removeTagFromFilter(
                                                      e.target.value
                                                  )
                                              )
                                    }
                                    className="mr-1"
                                    type="checkbox"
                                    name="tags"
                                    id={tag}
                                    checked={filter.tags.includes(tag)}
                                    value={tag}
                                />
                                {tag}
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => dispatch(resetFilters())}
                    className="py-1 px-6 my-2 ml-auto mr-4 bg-amber-400 text-zinc-600 text-xs font-bold w-fit rounded-md hover:bg-amber-500">
                    Clear
                </button>
            </div>
        </div>
    );
};
