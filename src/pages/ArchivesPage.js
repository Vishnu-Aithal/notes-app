import { ContentLayout } from "components/ContentLayout";
import { Filter } from "components/Filter";
import { Note } from "components/Note";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUnFilteredNotes } from "store/filteredNotesSlice";

export const ArchivesPage = () => {
    const archives = useSelector((state) => state.allNotes.archives);
    const dispatch = useDispatch();
    const { filteredNotes } = useSelector((state) => state.filteredNotes);
    useEffect(() => {
        dispatch(setUnFilteredNotes(archives));
    }, [archives, dispatch]);
    return (
        <ContentLayout>
            <Filter />
            {filteredNotes.map((note) => (
                <Note key={note._id} note={note} />
            ))}
        </ContentLayout>
    );
};
