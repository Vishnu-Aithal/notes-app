import { ChangeEvent } from "react";
import { useAppSelector } from "store/TypedExports";

interface SearchBarProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
}
export const SearchBar: React.FC<SearchBarProps> = ({ onChange, value }) => {
    const filteredNotes = useAppSelector(
        (state) => state.filteredNotes.filteredNotes
    );
    return (
        <>
            <input
                value={value}
                onChange={onChange}
                type="search"
                className=" bg-gray-100 dark:text-slate-200 dark:bg-zinc-700 p-2 rounded-md focus:bg-white dark:focus:bg-zinc-600 focus:shadow-md focus:border-gray-200 dark:focus:border-none focus:outline-none lg:w-1/3 w-2/3"
                placeholder="Search Headings..."
            />
            {filteredNotes.length === 0 && (
                <p className="absolute bottom-0 left-1/2 right-1/2 translate-y-full -translate-x-1/2 w-fit p-2 text-zinc-500 text-sm sm:text-base animate-fade-in">
                    No Notes matched your filter criteria, try clearing
                    filters...
                </p>
            )}
        </>
    );
};
