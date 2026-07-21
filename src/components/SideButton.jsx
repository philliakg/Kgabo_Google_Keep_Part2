function SideButton({ text, icon, active = false, onClick }) {
    return (
        <button
            type="button"
            className={active ? "side-button active" : "side-button"}
            title={text}
            aria-label={text}
            aria-current={active ? "page" : undefined}
            onClick={onClick}
        >
            <span className="material-symbols-outlined" aria-hidden="true">{icon}</span>
            <p>{text}</p>
        </button>
    );
}

export default SideButton;
