import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

// Container for movie cards and Load More button; handles data fetching
const MovieList = (props) => {
    // display a movie card for each movie in data
    return (
        <main className="movie-list">
            {props.movieData.map((movie) => (
                <MovieCard
                    movie={movie}
                    key={movie.id}
                    showModal={props.showModal}
                    isFavorited={props.favorites.includes(movie)}
                    addFavorite={props.addFavorite}
                    removeFavorite={props.removeFavorite}></MovieCard>
            ))}
            <button
                className="load-more-button"
                onClick={(event) => props.fetchMovieData()}>
                Load more...
            </button>
        </main>
    );
};

export default MovieList;
