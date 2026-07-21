import Note from "./Note.jsx";

const NoteList = ({ title, listOfNotes, colors, deleteNote, permanentlyDeleteNote, restoreNote, archiveNote, unarchiveNote, pinNote, changeNoteColor, updateNote, selectedView, listStyle, setDraggedNoteId, moveNote }) => {
    if (listOfNotes.length === 0) {
        return null;
    }

    return (
        <section className="note-list-section">
            <h3>{title}</h3>
            <section className={listStyle === "list" ? "note-list one-column" : "note-list"}>
                {listOfNotes.map((note) => (
                    <Note
                        key={note.id}
                        note={note}
                        colors={colors}
                        deleteNote={deleteNote}
                        permanentlyDeleteNote={permanentlyDeleteNote}
                        restoreNote={restoreNote}
                        archiveNote={archiveNote}
                        unarchiveNote={unarchiveNote}
                        pinNote={pinNote}
                        changeNoteColor={changeNoteColor}
                        updateNote={updateNote}
                        selectedView={selectedView}
                        setDraggedNoteId={setDraggedNoteId}
                        moveNote={moveNote}
                    />
                ))}
            </section>
        </section>
    );
};

export default NoteList;
