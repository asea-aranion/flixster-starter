// Displays dropdown for selecting sort option and updates movieData with new sorted array
const SortDropdown = ({ movieData, setMovieData }) => {

    // sort movieData on selection change (depending on which option was just selected)
    const sortMovieData = (event) => {

        // sort alphabetically by title
        if (event.target.value === "title") {
            setMovieData(
                movieData.toSorted((a, b) => {
                    return a.title.localeCompare(b.title);
                }),
            );
        // sort by release date, newest to oldest
        } else if (event.target.value === "date") {
            setMovieData(
                movieData.toSorted((a, b) => {
                    return new Date(b.release_date) - new Date(a.release_date);
                }),
            );
        // sort by vote average, highest to lowest
        } else if (event.target.value === "votes") {
            setMovieData(
                movieData.toSorted((a, b) => {
                    return b.vote_average - a.vote_average;
                }),
            );
        }
    };

    return (
        <select
            className="dropdown"
            onChange={sortMovieData}
            defaultValue="init">
            <option
                disabled={true}
                value="init">
                Select an option
            </option>
            <option value="title">Title (A-Z)</option>
            <option value="date">Release date (newest-oldest)</option>
            <option value="votes">Vote average (highest-lowest)</option>
        </select>
    );
};

export default SortDropdown;
