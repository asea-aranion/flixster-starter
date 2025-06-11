// Navigation sidebar that allows setting of what page is being shown in main area
const Sidebar = ({ page, setPage }) => {

    return (
        <nav>
            <button
                className={page === "main" ? "selected" : ""}
                onClick={() => setPage("main")}>
                Home
            </button>
            <button
                className={page === "favorites" ? "selected" : ""}
                onClick={() => setPage("favorites")}>
                Favorites
            </button>
            <button
                className={page === "watched" ? "selected" : ""}
                onClick={() => setPage("watched")}>
                Watched
            </button>
        </nav>
    );
};

export default Sidebar;
