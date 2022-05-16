import { ContentLayout } from "components/ContentLayout";
import { Filter } from "components/Filter";
import { FilterIcon } from "components/Icons";
import { Note } from "components/Note";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const NotesPage = ({}) => {
    const [showFilter, setShowFilter] = useState(false);
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.allNotes.notes);
    return (
        <ContentLayout>
            <div className="w-full text-center relative">
                <input
                    type="search"
                    className=" bg-gray-100 dark:bg-zinc-700 p-2 rounded-md focus:bg-white dark:focus:bg-zinc-600 focus:shadow-md focus:border-2 focus:border-gray-200 dark:focus:border-none focus:outline-none lg:w-1/3 w-2/3"
                    placeholder="Search Notes"
                />
                <button
                    className={`align-middle ml-2 ${
                        showFilter ? "pointer-events-none" : ""
                    }`}
                    onClick={() => setShowFilter(true)}>
                    <FilterIcon className={"h-5 w-5 text-zinc-500"} />
                </button>
                <Filter {...{ showFilter, setShowFilter }} />
            </div>
            {notes.map((note) => (
                <Note key={note._id} note={note} />
            ))}
        </ContentLayout>
    );
};
