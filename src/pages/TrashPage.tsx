import { ContentLayout } from "components/Layout/ContentLayout";
import { Filter } from "components/Filter/Filter";
import { Note } from "components/Note/Note";
import { useEffect } from "react";
import { resetFilters, setUnFilteredNotes } from "store/filteredNotesSlice";
import { useAppDispatch, useAppSelector } from "store/TypedExports";
import { CalenderIcon } from "assets/Icons/Icons";

export const TrashPage: React.FC = () => {
    const trash = useAppSelector((state) => state.allNotes.trash);
    const dispatch = useAppDispatch();
    const { filteredNotes } = useAppSelector((state) => state.filteredNotes);
    useEffect(() => {
        dispatch(setUnFilteredNotes(trash));
    }, [trash, dispatch]);
    useEffect(() => {
        dispatch(resetFilters());
    }, [dispatch]);
    return (
        <ContentLayout>
            {trash.length === 0 && (
                <>
                    <h1 className="w-full text-center text-lg mt-5 font-bold">
                        No Notes Here! Move Notes to Trash to view it here.
                    </h1>
                    <CalenderIcon className="h-1/2 w-1/2 m-auto opacity-50" />
                </>
            )}
            {trash.length > 0 && (
                <>
                    {" "}
                    <Filter />
                    {filteredNotes.map((note) => (
                        <Note key={note._id} note={note} />
                    ))}
                </>
            )}
        </ContentLayout>
    );
};
