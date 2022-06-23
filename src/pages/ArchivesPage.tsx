import { ContentLayout } from "components/Layout/ContentLayout";
import { Filter } from "components/Filter/Filter";
import { Note } from "components/Note/Note";
import { useEffect } from "react";
import { resetFilters, setUnFilteredNotes } from "store/filteredNotesSlice";
import { useAppDispatch, useAppSelector } from "store/TypedExports";
import { CalenderIcon } from "assets/Icons/Icons";

export const ArchivesPage: React.FC = () => {
    const archives = useAppSelector((state) => state.allNotes.archives);
    const dispatch = useAppDispatch();
    const { filteredNotes } = useAppSelector((state) => state.filteredNotes);
    useEffect(() => {
        dispatch(setUnFilteredNotes(archives));
    }, [archives, dispatch]);
    useEffect(() => {
        dispatch(resetFilters());
    }, [dispatch]);
    return (
        <ContentLayout>
            {archives.length === 0 && (
                <>
                    <h1 className="w-full text-center text-lg mt-5 font-bold">
                        No Notes Here! Add Notes to Archive to view here.
                    </h1>
                    <CalenderIcon className="h-1/2 w-1/2 m-auto opacity-50" />
                </>
            )}
            {archives.length > 0 && (
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
