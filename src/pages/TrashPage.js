import { ContentLayout } from "components/ContentLayout";
import { Note } from "components/Note";
import { useSelector } from "react-redux";

export const TrashPage = () => {
    const trash = useSelector((state) => state.allNotes.trash);
    return (
        <ContentLayout>
            {trash.map((note) => (
                <Note key={note._id} note={note} />
            ))}
        </ContentLayout>
    );
};
