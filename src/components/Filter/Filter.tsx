import { useRef, useEffect, useState, ChangeEvent } from "react";
import {
    processFilter,
    resetFilters,
    setSearchTerm,
} from "store/filteredNotesSlice";
import { useAppDispatch, useAppSelector } from "store/TypedExports";
import { CloseIcon, FilterIcon } from "../../assets/Icons/Icons";
import { DateSort } from "./DateSort";
import { PrioritySort } from "./PrioritySort";
import { SearchBar } from "./SearchBar";
import { TagFilter } from "./TagFilter";

type CustomDiv = { timeOutId: NodeJS.Timeout } & HTMLDivElement;

export const Filter: React.FC = () => {
    const [showFilter, setShowFilter] = useState(false);
    const ref = useRef<CustomDiv>(null!);
    const dispatch = useAppDispatch();
    const { filter, unFilteredNotes } = useAppSelector(
        (state) => state.filteredNotes
    );

    useEffect(() => ref.current.focus(), [showFilter]);

    useEffect(() => {
        dispatch(processFilter());
    }, [filter, dispatch, unFilteredNotes]);

    return (
        <div className="w-full text-center relative">
            <SearchBar
                value={filter.searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    dispatch(setSearchTerm(e.target.value))
                }
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
                tabIndex={-1}
                onFocus={() => clearTimeout(ref.current?.timeOutId)}
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

                <DateSort />

                <PrioritySort />

                <TagFilter />

                <button
                    onClick={() => dispatch(resetFilters())}
                    className="py-1 px-6 my-2 ml-auto mr-4 bg-amber-400 text-zinc-600 text-xs font-bold w-fit rounded-md hover:bg-amber-500">
                    Clear
                </button>
            </div>
        </div>
    );
};
