import { useRef, useEffect } from "react";
import { CloseIcon } from "./Icons";

export const Filter = ({ showFilter, setShowFilter }) => {
    const ref = useRef();
    useEffect(() => ref.current.focus(), [showFilter]);
    return (
        <div
            ref={ref}
            tabIndex="-1"
            onBlur={() => setShowFilter(false)}
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
            <div className="p-4 border-b-1 border-gray-200 dark:border-zinc-700">
                <p className="font-bold mb-2">Sort By</p>
                <div className="ml-2 text-sm font-medium flex flex-col space-y-2 ">
                    <label htmlFor="newest-first">
                        <input
                            className="mr-1"
                            type="radio"
                            name="date-sort"
                            id="newest-first"
                        />
                        Newest First
                    </label>

                    <label htmlFor="oldest-first">
                        <input
                            className="mr-1"
                            type="radio"
                            name="date-sort"
                            id="oldest-first"
                        />
                        Oldest First
                    </label>
                </div>
            </div>
            <div className="p-4 border-b-1 border-gray-200 dark:border-zinc-700">
                <p className="font-bold mb-2">Filter By Label</p>
                <div className="ml-2 text-sm font-medium flex flex-col space-y-2">
                    <label htmlFor="work">
                        <input
                            className="mr-1"
                            type="checkbox"
                            name=""
                            id="work"
                        />
                        Work
                    </label>

                    <label htmlFor="study">
                        <input
                            className="mr-1"
                            type="checkbox"
                            name=""
                            id="study"
                        />
                        Study
                    </label>

                    <label htmlFor="casual">
                        <input
                            className="mr-1"
                            type="checkbox"
                            name=""
                            id="casual"
                        />
                        Casual
                    </label>
                </div>
            </div>
            <button className="py-1 px-6 my-2 ml-auto mr-4 bg-amber-400 text-zinc-600 font-bold w-fit rounded-md hover:bg-amber-500">
                Apply
            </button>
        </div>
    );
};
