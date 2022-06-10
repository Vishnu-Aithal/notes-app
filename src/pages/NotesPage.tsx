import { ContentLayout } from "components/Layout/ContentLayout";
import { Filter } from "components/Filter/Filter";
import { Note } from "components/Note/Note";
import { useEffect, useState } from "react";
import { resetFilters, setUnFilteredNotes } from "store/filteredNotesSlice";
import { useAppDispatch, useAppSelector } from "store/TypedExports";
import { NoteType } from "types/Note";

export const NotesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const notes = useAppSelector((state) => state.allNotes.notes);
    const [pinNotes, setPinNotes] = useState({
        pinned: [] as NoteType[],
        unPinned: [] as NoteType[],
    });
    const { filteredNotes } = useAppSelector((state) => state.filteredNotes);
    useEffect(() => {
        dispatch(setUnFilteredNotes(notes));
    }, [notes, dispatch]);
    useEffect(() => {
        dispatch(resetFilters());
    }, [dispatch]);

    useEffect(() => {
        const pinned = filteredNotes.filter((note) => note.pinned);
        const unPinned = filteredNotes.filter((note) => !note.pinned);
        setPinNotes({ pinned, unPinned });
    }, [filteredNotes]);
    return (
        <ContentLayout>
            <Filter />
            {pinNotes.pinned.length !== 0 && (
                <div className="flex flex-wrap gap-6 w-full animate-fade-in">
                    <h2 className="w-full text-lg font-semibold ml-1 text-zinc-500">
                        PINNED
                    </h2>
                    {pinNotes.pinned.map((note) => (
                        <Note key={note._id} note={note} />
                    ))}
                    <hr className="w-full h-1 bg-zinc-500 border-0" />
                    <h2 className="w-full text-lg font-semibold ml-1 text-zinc-500">
                        OTHERS
                    </h2>
                </div>
            )}
            {pinNotes.unPinned.map((note) => (
                <Note key={note._id} note={note} />
            ))}
        </ContentLayout>
    );
};
