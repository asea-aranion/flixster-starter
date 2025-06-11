import { useEffect, useState } from "react";

// Navigation sidebar that allows setting of what page is being shown in main area
const Sidebar = ({ page, setPage }) => {

    // local state to avoid setting parent's state while this child is rendering
    const [sidebarPage, setSidebarPage] = useState(page);

    // update parent whenever local state changes
    useEffect(() => setPage(sidebarPage), [sidebarPage]);

    return (
        <nav>
            <button
                className={page === "main" ? "selected" : ""}
                onClick={() => setSidebarPage("main")}>
                Home
            </button>
            <button
                className={page === "favorites" ? "selected" : ""}
                onClick={() => setSidebarPage("favorites")}>
                Favorites
            </button>
            <button
                className={page === "watched" ? "selected" : ""}
                onClick={() => setSidebarPage("watched")}>
                Watched
            </button>
        </nav>
    );
};

export default Sidebar;
