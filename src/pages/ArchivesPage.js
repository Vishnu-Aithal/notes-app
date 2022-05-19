import { ContentLayout } from "components/ContentLayout";
import { Note } from "components/Note";
import { useSelector } from "react-redux";

export const ArchivesPage = () => {
    const archives = useSelector((state) => state.allNotes.archives);
    return (
        <ContentLayout>
            {archives.map((note) => (
                <Note key={note._id} note={note} />
            ))}
        </ContentLayout>
    );
};
