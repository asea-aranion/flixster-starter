const SortDropdown = (props) => {

    const sortMovieData = (event) => {
        if (event.target.value === "title") {
            props.setMovieData(props.movieData.toSorted((a, b) => {
                return a.title.localeCompare(b.title)
            }))
        } else if (event.target.value === "date") {
            props.setMovieData(props.movieData.toSorted((a, b) => {
                return new Date(b.release_date) - new Date(a.release_date)
            }))
        } else if (event.target.value === "votes") {
            props.setMovieData(props.movieData.toSorted((a, b) => {
                return b.vote_average - a.vote_average
            }))
        }
    }

    return (
        <select className="dropdown" onChange={sortMovieData} defaultValue="init">
            <option value="init">Select an option</option>
            <option value="title">Title (A-Z)</option>
            <option value="date">Release date (newest-oldest)</option>
            <option value="votes">Vote average (highest-lowest)</option>
        </select>
    )
}

export default SortDropdown;