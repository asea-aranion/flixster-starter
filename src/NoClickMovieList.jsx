import NoClickMovieCard from "./NoClickMovieCard";

// Container for movie cards with no modal onclick or load more button (used to show favorites and watched)
const NoClickMovieList = (props) => {

    if (props.movieData.length === 0) {

        // display message if given collection is empty (no favorites/watched)
        return <h2 className="message">No movies to display.</h2>;
    } else {
        return (
            <div className="movie-list">
                {props.movieData.map((movie) => (
                    <NoClickMovieCard
                        movie={movie}
                        key={movie.id}></NoClickMovieCard>
                ))}
            </div>
        );
    }
};

export default NoClickMovieList;
