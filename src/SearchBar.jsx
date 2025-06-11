import { useRef } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

// Handles user input of search term, passing input up to state; includes clear and search buttons
const SearchBar = (props) => {

    // reference to text input
    const searchInputRef = useRef(null);

    // update parent's state variable for search term
    const handleSubmitSearch = (event) => {
        event.preventDefault();
        props.updateSearch(searchInputRef.current.value);
    };

    // if enter is pressed in text input, update parent's state variable
    const handleInputKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            props.updateSearch(searchInputRef.current.value);
        }
    };

    // clear input display and update parent's state variable to an empty string
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
