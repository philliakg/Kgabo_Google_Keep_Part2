import { useEffect, useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation.jsx";
import SideBar from "./components/SideBar.jsx";
import NoteInputCollapsed from "./components/NoteInputCollapsed.jsx";
import NoteInputExpanded from "./components/NoteInputExpanded.jsx";
import NoteList from "./components/NoteList.jsx";

const colors = ["white", "#faafa8", "#f39f76", "#fff8b8", "#e2f6d3", "#b4ddd3", "#d4e4ed", "#f6e2dd"];
const Categories = ["Personal", "Work", "Inspiration", "Others"];
const defaultCategories = ["Personal", "Work", "Inspiration", "Other"];

const sampleNotes = [
    {
        id: 1,
        title: "Stationary",
        text: "Pens, pencils, paper, etc.",
        color: "#ffffff",
        pinned: false,
        category: "Personal",
        reminder: false,
        reminderDate: "",
        archived: false,
        deleted: false
    },
    {
        id: 2,
        title: "Groceries",
        text: "Milk, bread, eggs, etc.",
        color: "#ffffff",
        pinned: false,
        category: "Other",
        reminder: true,
        reminderDate: "",
        archived: false,
        deleted: false
    },
    {
        id: 3,
        title: "Trust in God",
        text: "Trust in God and he will provide",
        color: "#fff8b8",
        pinned: true,
        category: "Inspiration",
        reminder: false,
        reminderDate: "",
        archived: false,
        deleted: false
    },
    {
        id: 4,
        title: "Project",
        text: "Complete the project by the end of the week",
        color: "#ffffff",
        pinned: false,
        category: "Work",
        reminder: false,
        reminderDate: "",
        archived: false,
        deleted: false
    },
    {
        id: 5,
        title: "Books",
        text: "Read the book by the end of the month",
        color: "#e2f6d3",
        pinned: false,
        category: "Personal",
        reminder: false,
        reminderDate: "",
        archived: false,
        deleted: false
    }
];

const getNotes = () => {
    const savedNotes = localStorage.getItem("googleKeepReactNotes");

    if (savedNotes) {
        return JSON.parse(savedNotes);
    }

    return sampleNotes;
};

const getCategories = () => {
    const savedCategories = localStorage.getItem("googleKeepReactCategories");

    if (savedCategories) {
        return JSON.parse(savedCategories);
    }

    return defaultCategories;
};

const getDarkMode = () => {
    const savedMode = localStorage.getItem("googleKeepDarkMode");

    return savedMode === "true";
};

const App = () => {
    const [notes, setNotes] = useState(getNotes);
    const [categories, setCategories] = useState(getCategories);
    const [searchText, setSearchText] = useState("");
    const [selectedView, setSelectedView] = useState("Notes");
    const [showInput, setShowInput] = useState(false);
    const [listStyle, setListStyle] = useState("grid");
    const [message, setMessage] = useState("");
    const [darkMode, setDarkMode] = useState(getDarkMode);
    const [draggedNoteId, setDraggedNoteId] = useState("");
    const [showSidebar, setShowSidebar] = useState(true);

    useEffect(() => {
        localStorage.setItem("googleKeepReactNotes", JSON.stringify(notes));
    }, [notes]);

    useEffect(() => {
        localStorage.setItem("googleKeepReactCategories", JSON.stringify(categories));
    }, [categories]);

    useEffect(() => {
        localStorage.setItem("googleKeepDarkMode", darkMode);
    }, [darkMode]);

    const showMessage = (text) => {
        setMessage(text);

        setTimeout(() => {
            setMessage("");
        }, 2500);
    };

    const addNote = (title, text, color, category, reminder, reminderDate) => {
        const newNote = {
            id: Date.now(),
            title,
            text,
            color,
            pinned: false,
            category,
            reminder,
            reminderDate,
            archived: false,
            deleted: false
        };

        setNotes((currentNotes) => [newNote, ...currentNotes]);
    };

    const deleteNote = (id) => {
        setNotes((currentNotes) =>
            currentNotes.map((note) => note.id === id ? { ...note, pinned: false, archived: false, deleted: true } : note)
        );
    };

    const permanentlyDeleteNote = (id) => {
        setNotes((currentNotes) => currentNotes.filter(({ id: noteId }) => noteId !== id));
    };

    const restoreNote = (id) => {
        setNotes((currentNotes) => {
            const restoredNotes = [...currentNotes];
            const matchIndex = restoredNotes.findIndex((note) => note.id === id);

            if (matchIndex > -1) {
                restoredNotes[matchIndex] = {
                    ...restoredNotes[matchIndex],
                    archived: false,
                    deleted: false
                };
            }

            return restoredNotes;
        });
    };

    const archiveNote = (id) => {
        setNotes((currentNotes) => currentNotes.map((note) => {
            const shouldArchive = note.id === id;
            return shouldArchive ? { ...note, pinned: false, archived: true, deleted: false } : note;
        }));
    };

    const unarchiveNote = (id) => {
        setNotes((currentNotes) => {
            return currentNotes.map((note) => {
                if (note.id !== id) {
                    return note;
                }

                return { ...note, archived: false, deleted: false };
            });
        });
    };

    const pinNote = (id) => {
        setNotes((currentNotes) =>
            currentNotes.map((note) => note.id !== id ? note : { ...note, pinned: !note.pinned })
        );
    };

    const changeNoteColor = (id, color) => {
        setNotes((currentNotes) => currentNotes.reduce((updatedNotes, note) => {
            updatedNotes.push(note.id === id ? { ...note, color } : note);
            return updatedNotes;
        }, []));
    };

    const updateNote = (id, updates) => {
        setNotes((currentNotes) =>
            currentNotes.map((note) => note.id === id ? { ...note, ...updates } : note)
        );
    };

    const moveNote = (dropNoteId) => {
        if (!draggedNoteId || draggedNoteId === dropNoteId) {
            return;
        }

        const draggedNote = notes.find((note) => note.id === draggedNoteId);
        const notesWithoutDraggedNote = notes.filter((note) => note.id !== draggedNoteId);
        const dropIndex = notesWithoutDraggedNote.findIndex((note) => note.id === dropNoteId);
        const newNotes = [...notesWithoutDraggedNote];

        newNotes.splice(dropIndex, 0, draggedNote);
        setNotes(newNotes);
        setDraggedNoteId("");
    };

    const addLabel = () => {
        const label = window.prompt("Enter a new label name");

        if (label && label.trim() !== "") {
            setCategories([...categories, label.trim()]);
            setSelectedView(label.trim());
        }
    };

    const refreshPage = () => {
        setSearchText("");
        showMessage("Notes refreshed");
    };

    const changeView = () => {
        if (listStyle === "grid") {
            setListStyle("list");
            showMessage("List view selected");
        } else {
            setListStyle("grid");
            showMessage("Grid view selected");
        }
    };

    const openSettings = () => {
        showMessage("Settings are not available yet");
    };

    const openApps = () => {
        showMessage("Apps menu is not connected yet");
    };

    const openAccount = () => {
        showMessage("Account is not connected yet");
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleSidebar = () => {
        setShowSidebar((current) => !current);
    };

    let shownNotes = notes.filter((note) => {
        if (selectedView === "Notes") {
            return !note.archived && !note.deleted;
        }

        if (selectedView === "Reminders") {
            return (note.reminder || note.reminderDate) && !note.archived && !note.deleted;
        }

        if (selectedView === "Archive") {
            return note.archived && !note.deleted;
        }

        if (selectedView === "Trash") {
            return note.deleted;
        }

        return note.category === selectedView && !note.archived && !note.deleted;
    });

    shownNotes = shownNotes.filter((note) => {
        const noteTitle = note.title.toLowerCase();
        const noteText = note.text.toLowerCase();
        const noteCategory = note.category.toLowerCase();
        const noteReminder = note.reminderDate ? note.reminderDate.toLowerCase() : "";
        const search = searchText.toLowerCase();

        return noteTitle.includes(search) || noteText.includes(search) || noteCategory.includes(search) || noteReminder.includes(search);
    });

    const pinnedNotes = shownNotes.filter((note) => note.pinned && selectedView !== "Archive" && selectedView !== "Trash");
    const otherNotes = shownNotes.filter((note) => !note.pinned);

    return (
        <div className={`${darkMode ? "app dark-mode" : "app"}${showSidebar ? "" : " sidebar-hidden"}`}>
            <Navigation
                searchText={searchText}
                setSearchText={setSearchText}
                refreshPage={refreshPage}
                changeView={changeView}
                openSettings={openSettings}
                openApps={openApps}
                openAccount={openAccount}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                showSidebar={showSidebar}
                toggleSidebar={toggleSidebar}
            />
            <SideBar
                categories={categories}
                selectedView={selectedView}
                setSelectedView={setSelectedView}
                addLabel={addLabel}
            />
            <main className="main-area">
                {message && <p className="message-box">{message}</p>}
                {selectedView !== "Archive" && selectedView !== "Trash" && (
                    showInput ? (
                        <NoteInputExpanded addNote={addNote} colors={colors} categories={categories} setShowInput={setShowInput} startReminder={selectedView === "Reminders"} />
                    ) : (
                        <NoteInputCollapsed setShowInput={setShowInput} />
                    )
                )}
                <NoteList
                    title="Pinned"
                    listOfNotes={pinnedNotes}
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
                    listStyle={listStyle}
                    setDraggedNoteId={setDraggedNoteId}
                    moveNote={moveNote}
                />
                <NoteList
                    title={pinnedNotes.length > 0 ? "Others" : selectedView}
                    listOfNotes={otherNotes}
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
                    listStyle={listStyle}
                    setDraggedNoteId={setDraggedNoteId}
                    moveNote={moveNote}
                />
                {shownNotes.length === 0 && (
                    <div className="empty-box">
                        <img src="/keepLogo.png" alt="Google Keep" className="empty-keep-image" />
                        <p>No notes found in {selectedView}</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;
