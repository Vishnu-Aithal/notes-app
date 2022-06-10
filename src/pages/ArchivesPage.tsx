import { ContentLayout } from "components/Layout/ContentLayout";
import { Filter } from "components/Filter/Filter";
import { Note } from "components/Note/Note";
import { useEffect } from "react";
import { resetFilters, setUnFilteredNotes } from "store/filteredNotesSlice";
import { useAppDispatch, useAppSelector } from "store/TypedExports";

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
            <Filter />
            {filteredNotes.map((note) => (
                <Note key={note._id} note={note} />
            ))}
        </ContentLayout>
    );
};
