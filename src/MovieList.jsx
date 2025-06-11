import MovieCard from "./MovieCard";

// Container for movie cards and Load More button; handles data fetching
const MovieList = ({ movieData, fetchMovieData, showModal, favorites, addFavorite, removeFavorite, watched, addWatched, removeWatched }) => {
    // display a movie card for each movie in data
    return (
        <main className="movie-list">
            {movieData.map((movie) => (
                <MovieCard
                    movie={movie}
                    key={movie.id}
                    showModal={showModal}
                    isFavorited={favorites.includes(movie)}
                    addFavorite={addFavorite}
                    removeFavorite={removeFavorite}
                    isWatched={watched.includes(movie)}
                    addWatched={addWatched}
                    removeWatched={removeWatched}></MovieCard>
            ))}
            <button
                className="load-more-button"
                onClick={fetchMovieData}>
                Load more...
            </button>
        </main>
    );
};

export default MovieList;
