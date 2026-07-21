import { useState } from "react";
import ButtonList from "./ButtonList.jsx";

const NoteInputExpanded = ({ addNote, colors, categories, setShowInput, startReminder }) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [color, setColor] = useState("white");
    const [category, setCategory] = useState("Personal");
    const [reminder, setReminder] = useState(startReminder);
    const [reminderDate, setReminderDate] = useState("");

    const updateTitle = ({ currentTarget }) => {
        setTitle(currentTarget.value);
    };

    const updateBody = (change) => {
        setText(change.target.value);
    };

    const chooseCategory = (selection) => {
        setCategory(selection.currentTarget.value);
    };

    const toggleReminder = ({ target }) => {
        setReminder(target.checked);
    };

    const scheduleReminder = (dateInput) => {
        setReminderDate(dateInput.currentTarget.value);
        setReminder(true);
    };

    const saveNote = () => {
        if (title.trim() !== "" || text.trim() !== "") {
            addNote(title, text, color, category, reminder, reminderDate);
        }

        setTitle("");
        setText("");
        setColor("white");
        setCategory("Personal");
        setReminder(false);
        setReminderDate("");
        setShowInput(false);
    };

    return (
        <section className="note-input-expanded" style={{ backgroundColor: color }}>
            <input type="text" placeholder="Title" aria-label="Note title" value={title} onChange={updateTitle} />
            <textarea placeholder="Take a note..." aria-label="Note body" value={text} onChange={updateBody}></textarea>
            <section>
                <ButtonList colors={colors} selectedColor={color} setSelectedColor={setColor} />
                <select value={category} aria-label="Note category" onChange={chooseCategory}>
                    {categories.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                <label className="reminder-check">
                    <input type="checkbox" checked={reminder} onChange={toggleReminder} />
                    Reminder
                </label>
                <input
                    className="reminder-date"
                    type="datetime-local"
                    value={reminderDate}
                    onChange={scheduleReminder}
                    aria-label="Choose reminder date and time"
                />
                <button type="button" onClick={saveNote}>Close</button>
            </section>
        </section>
    );
};

export default NoteInputExpanded;
