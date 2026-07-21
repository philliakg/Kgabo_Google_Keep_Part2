function SearchBar({ searchText, setSearchText }) {
    const classIcon = "material-symbols-outlined";
    const icons = "material-symbols-outlined";
    const handleSearchInput = (evt) => {
        setSearchText(evt.currentTarget.value);
    };

    return (
        <section className="search-bar">
            <span className={icons} aria-hidden="true">Search</span>
            <input
                type="search"
                placeholder="Search"
                aria-label="Search notes"
                value={searchText}
                onChange={handleSearchInput}
            />
        </section>
    );
}

export default SearchBar;
