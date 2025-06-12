import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

// Navigation sidebar that allows setting of what page is being shown in main area
const Sidebar = ({ page, setPage }) => {

    return (
        <nav>
            <button
                className={page === "main" ? "selected" : ""}
                onClick={() => setPage("main")}>
                <HomeRoundedIcon></HomeRoundedIcon><p>Home</p>
            </button>
            <button
                className={page === "favorites" ? "selected" : ""}
                onClick={() => setPage("favorites")}>
                <FavoriteRoundedIcon></FavoriteRoundedIcon><p>Favorites</p>
            </button>
            <button
                className={page === "watched" ? "selected" : ""}
                onClick={() => setPage("watched")}>
                <VisibilityRoundedIcon></VisibilityRoundedIcon><p>Watched</p>
            </button>
        </nav>
    );
};

export default Sidebar;
