import { ChangeEvent } from "react";

interface SearchBarProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
}
export const SearchBar: React.FC<SearchBarProps> = ({ onChange, value }) => {
    return (
        <input
            value={value}
            onChange={onChange}
            type="search"
            className=" bg-gray-100 dark:text-slate-200 dark:bg-zinc-700 p-2 rounded-md focus:bg-white dark:focus:bg-zinc-600 focus:shadow-md focus:border-2 focus:border-gray-200 dark:focus:border-none focus:outline-none lg:w-1/3 w-2/3"
            placeholder="Search Headings..."
        />
    );
};
