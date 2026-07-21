const NoteInputCollapsed = ({ setShowInput }) => {
    const openComposer = () => {
        setShowInput(true);
    };

    return (
        <button className="note-input-collapsed" type="button" onClick={openComposer} title="Take a note" aria-label="Create a new note">
            <p>Take a note...</p>
            <span className="material-symbols-outlined" title="New list" aria-hidden="true">Check_box</span>
            <span className="material-symbols-outlined" title="New note with image" aria-hidden="true">Image</span>
        </button>
    );
};

export default NoteInputCollapsed;
