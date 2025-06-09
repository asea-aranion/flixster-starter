import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

// Container for movie cards and Load More button; handles data fetching
const MovieList = () => {

    // array of fetched movies
    const [movieData, setMovieData] = useState(new Array());
    // number of next TMDb page with new movies
    const [pageNum, setPageNum] = useState(1);

    // fetch movies from TMDb and load into movieData
    const fetchMovieData = () => {
        const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNum}&api_key=${import.meta.env.VITE_API_KEY}`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        };

        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                setMovieData([...movieData, ...json.results]);
                setPageNum(pageNum + 1);
            })
            .catch((error) => console.error(error));
    };

    // fetch data on component mount
    useEffect(fetchMovieData, []);

    // display a movie card for each movie in data
    return (
        <main className="movie-list">
            {movieData.map((movie) => (
                <MovieCard movie={movie} key={movie.id}></MovieCard>
            ))}
            <button className="load-more-button" onClick={fetchMovieData}>
                Load more...
            </button>
        </main>
    );
};

export default MovieList;
