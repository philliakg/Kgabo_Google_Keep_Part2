import SearchBar from "./SearchBar.jsx";
import keepLogo from "../assets/keepLogo.png";

function Navigation({ searchText, setSearchText, refreshPage, changeView, openSettings, openApps, openAccount, darkMode, toggleDarkMode, showSidebar, toggleSidebar }) {
    const icons = "material-symbols-outlined";
    const colorModeLabel = darkMode ? "Switch to light mode" : "Switch to dark mode";
    const colorModeIcon = darkMode ? "Light_mode" : "Dark_mode";
    const menuLabel = showSidebar ? "Hide sidebar" : "Show sidebar";

    return (
        <header>
            <section>
                <button
                    className="icon-button"
                    type="button"
                    title={menuLabel}
                    aria-label={menuLabel}
                    aria-expanded={showSidebar}
                    onClick={toggleSidebar}
                >
                    <span className={icons} aria-hidden="true">Menu</span>
                </button>
                <img src={keepLogo} alt="Google Keep" />
                <h1>Keep</h1>
                <SearchBar searchText={searchText} setSearchText={setSearchText} />
            </section>

            <section>
                <button className="icon-button" type="button" title="Refresh" aria-label="Refresh notes" onClick={refreshPage}>
                    <span className={icons} aria-hidden="true">Refresh</span>
                </button>
                <button className="icon-button" type="button" title="Change view" aria-label="Change note view" onClick={changeView}>
                    <span className={icons} aria-hidden="true">Grid_view</span>
                </button>
                <button className="icon-button" type="button" title={colorModeLabel} aria-label={colorModeLabel} onClick={toggleDarkMode}>
                    <span className={icons} aria-hidden="true">{colorModeIcon}</span>
                </button>
                <button className="icon-button" type="button" title="Settings" aria-label="Open settings" onClick={openSettings}>
                    <span className={icons} aria-hidden="true">Settings</span>
                </button>
                <button className="icon-button" type="button" title="Google apps" aria-label="Open Google apps" onClick={openApps}>
                    <span className={icons} aria-hidden="true">Apps</span>
                </button>
                <button className="icon-button" type="button" title="Account" aria-label="Open account" onClick={openAccount}>
                    <span className={icons} aria-hidden="true">Account_circle</span>
                </button>
            </section>
        </header>
    );
}

export default Navigation;
