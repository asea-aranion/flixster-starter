import { useEffect, useState } from "react";

const Sidebar = (props) => {
    const [sidebarPage, setSidebarPage] = useState(props.page);

    useEffect(() => props.setPage(sidebarPage), [sidebarPage]);

    return (
        <nav>
            <button
                className={props.page === "main" ? "selected" : ""}
                onClick={() => setSidebarPage("main")}>
                Home
            </button>
            <button
                className={props.page === "favorites" ? "selected" : ""}
                onClick={() => setSidebarPage("favorites")}>
                Favorites
            </button>
            <button
                className={props.page === "watched" ? "selected" : ""}
                onClick={() => setSidebarPage("watched")}>
                Watched
            </button>
        </nav>
    );
};

export default Sidebar;
