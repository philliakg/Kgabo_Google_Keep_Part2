import { useState } from "react";
import ButtonList from "./ButtonList.jsx";

const Note = ({ note, colors, deleteNote, permanentlyDeleteNote, restoreNote, archiveNote, unarchiveNote, pinNote, changeNoteColor, updateNote, selectedView, setDraggedNoteId, moveNote }) => {
    const [isEditing, setIsEditing] = useState(false);
    const reminderText = note.reminderDate ? new Date(note.reminderDate).toLocaleString() : "Reminder";
    const coloredNote = note.color !== "white" && note.color !== "#ffffff";
    const canEdit = selectedView !== "Trash";

    const startEditing = () => {
        if (canEdit) {
            setIsEditing(true);
        }
    };

    const stopEditing = () => {
        setIsEditing(false);
    };

    const updateTitle = (event) => {
        updateNote(note.id, { title: event.target.value });
    };

    const updateText = (event) => {
        updateNote(note.id, { text: event.target.value });
    };

    return (
        <article
            className={coloredNote ? "note colored-note" : "note"}
            style={{ backgroundColor: coloredNote ? note.color : "" }}
            draggable={!isEditing}
            onDragStart={() => {
                if (!isEditing) {
                    setDraggedNoteId(note.id);
                }
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => moveNote(note.id)}
        >
            {selectedView !== "Archive" && selectedView !== "Trash" && (
                <button
                    className={note.pinned ? "pin-button pinned" : "pin-button"}
                    type="button"
                    onClick={() => pinNote(note.id)}
                    title={note.pinned ? "Unpin note" : "Pin note"}
                    aria-label={note.pinned ? "Unpin note" : "Pin note"}
                >
                    <span className="material-symbols-outlined" aria-hidden="true">Push_pin</span>
                </button>
            )}
            {canEdit ? (
                <>
                    <input
                        className="note-title-input"
                        type="text"
                        value={note.title}
                        placeholder="Title"
                        aria-label="Edit note title"
                        onChange={updateTitle}
                        onFocus={startEditing}
                        onBlur={stopEditing}
                    />
                    <textarea
                        className="note-text-input"
                        value={note.text}
                        placeholder="Take a note..."
                        aria-label="Edit note body"
                        rows={Math.max(2, note.text.split("\n").length)}
                        onChange={updateText}
                        onFocus={startEditing}
                        onBlur={stopEditing}
                    />
                </>
            ) : (
                <>
                    <h2>{note.title}</h2>
                    <p>{note.text}</p>
                </>
            )}
            <small>{note.category}</small>
            {(note.reminder || note.reminderDate) && <small>{reminderText}</small>}
            <section>
                {selectedView !== "Trash" && <ButtonList colors={colors} selectedColor={note.color} setSelectedColor={(color) => changeNoteColor(note.id, color)} />}
                {selectedView === "Trash" && (
                    <button className="delete-button" type="button" onClick={() => restoreNote(note.id)} title="Restore note" aria-label="Restore note">
                        <span className="material-symbols-outlined" aria-hidden="true">Restore_from_trash</span>
                    </button>
                )}
                {selectedView === "Archive" && (
                    <button className="delete-button" type="button" onClick={() => unarchiveNote(note.id)} title="Unarchive note" aria-label="Unarchive note">
                        <span className="material-symbols-outlined" aria-hidden="true">Unarchive</span>
                    </button>
                )}
                {selectedView !== "Archive" && selectedView !== "Trash" && (
                    <button className="delete-button" type="button" onClick={() => archiveNote(note.id)} title="Archive note" aria-label="Archive note">
                        <span className="material-symbols-outlined" aria-hidden="true">Archive</span>
                    </button>
                )}
                {selectedView === "Trash" ? (
                    <button className="delete-button" type="button" onClick={() => permanentlyDeleteNote(note.id)} title="Delete forever" aria-label="Delete forever">
                        <span className="material-symbols-outlined" aria-hidden="true">Delete_forever</span>
                    </button>
                ) : (
                    <button className="delete-button" type="button" onClick={() => deleteNote(note.id)} title="Delete note" aria-label="Move note to trash">
                        <span className="material-symbols-outlined" aria-hidden="true">Delete</span>
                    </button>
                )}
            </section>
        </article>
    );
};

export default Note;
