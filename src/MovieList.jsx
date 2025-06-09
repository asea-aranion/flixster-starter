import { useEffect, useState } from "react";

const MovieList = () => {

    const [loading, setLoading] = useState(true);
    const [movieData, setMovieData] = useState(new Array());

    const fetchMovieData = () => {

        setLoading(true);

        const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${import.meta.env.VITE_API_KEY}`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json"
            }
        };

        fetch(url, options)
            .then(response => response.json())
            .then(json => {
                setLoading(false);
                setMovieData(movieData.concat(movieData, json.results));
            })
            .catch(error =>
                console.error(error)
            )
        
    }

    useEffect(fetchMovieData, []);

    return (
        loading ? 
        <main className="loading">
            Loading
        </main>
        :
        <main className="movie-list">
            {movieData.map(movie => 
                <p>{movie.title}</p>
            )}
        </main>
    );
}

export default MovieList;