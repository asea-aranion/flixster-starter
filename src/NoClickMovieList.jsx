import NoClickMovieCard from "./NoClickMovieCard";

const NoClickMovieList = (props) => {
    if (props.movieData.length === 0) {
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
