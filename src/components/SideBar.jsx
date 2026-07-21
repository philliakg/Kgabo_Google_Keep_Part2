import SideButton from "./SideButton.jsx";

const SideBar = ({ categories, selectedView, setSelectedView, addLabel }) => {
    return (
        <aside>
            <SideButton text="Notes" icon="lightbulb_2" active={selectedView === "Notes"} onClick={() => setSelectedView("Notes")} />
            <SideButton text="Reminders" icon="notifications" active={selectedView === "Reminders"} onClick={() => setSelectedView("Reminders")} />
            {categories.map((category) => (
                <SideButton key={category} text={category} icon="label" active={selectedView === category} onClick={() => setSelectedView(category)} />
            ))}
            <SideButton text="Edit labels" icon="edit" onClick={addLabel} />
            <SideButton text="Archive" icon="archive" active={selectedView === "Archive"} onClick={() => setSelectedView("Archive")} />
            <SideButton text="Trash" icon="delete" active={selectedView === "Trash"} onClick={() => setSelectedView("Trash")} />
        </aside>
    );
};

export default SideBar;
