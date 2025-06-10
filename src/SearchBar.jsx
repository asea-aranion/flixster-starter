import { useRef } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const SearchBar = (props) => {
    const searchInputRef = useRef(null);

    const handleSubmitSearch = (event) => {
        event.preventDefault();
        props.updateSearch(searchInputRef.current.value);
    };

    const handleInputKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            props.updateSearch(searchInputRef.current.value);
        }
    };

    const clearInput = (event) => {
        event.preventDefault();
        searchInputRef.current.value = "";
        props.updateSearch("");
    };

    return (
        <form className="search-bar">
            <div className="input-container">
                <SearchRoundedIcon></SearchRoundedIcon>
                <input
                    type="text"
                    ref={searchInputRef}
                    onKeyDown={handleInputKeyDown}></input>
                <button onClick={clearInput}>
                    <CloseRoundedIcon></CloseRoundedIcon>
                </button>
            </div>

            <button
                type="submit"
                onClick={handleSubmitSearch}>
                Search
            </button>
        </form>
    );
};

export default SearchBar;
