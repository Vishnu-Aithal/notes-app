import { useEffect, useState } from "react";
import { addTagToFilter, removeTagFromFilter } from "store/filteredNotesSlice";
import { useAppDispatch, useAppSelector } from "store/TypedExports";

export const TagFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const { filter, unFilteredNotes } = useAppSelector(
        (state) => state.filteredNotes
    );
    const [tags, setTags] = useState<string[]>([]);
    useEffect(() => {
        const getTags = () => {
            let tags = unFilteredNotes.reduce(
                (tags, note) => [...tags, ...note.tags],
                [] as string[]
            );
            tags = Array.from(new Set(tags));
            return tags;
        };
        setTags(getTags());
    }, [unFilteredNotes, setTags]);
    return (
        <div className="p-4 border-b-1 border-gray-200 dark:border-zinc-700">
            <p className="font-bold mb-2">Filter By Tags</p>
            <div className="ml-2 text-sm font-medium flex flex-col space-y-2">
                {tags.map((tag) => (
                    <label key={tag} htmlFor={tag}>
                        <input
                            onChange={(e) =>
                                e.target.checked
                                    ? dispatch(addTagToFilter(e.target.value))
                                    : dispatch(
                                          removeTagFromFilter(e.target.value)
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
    );
};
