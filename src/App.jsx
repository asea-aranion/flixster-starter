import { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import SortDropdown from "./SortDropdown";
import TMDBLogo from "./assets/tmdb_logo.svg";
import Sidebar from "./Sidebar";
import NoClickMovieList from "./NoClickMovieList";

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");

    // next page with new results for now playing or search
    const [pageNum, setPageNum] = useState(1);

    // array of fetched movies
    const [movieData, setMovieData] = useState(Array());

    // id of movie being shown in modal; null when modal is hidden
    const [modalDataId, setModalDataId] = useState(null);

    // array of json data for favorited movies
    const [favorites, setFavorites] = useState(Array());

    // array of json data for watched movies
    const [watched, setWatched] = useState(Array());

    // current page (main/favorites/watched)
    const [page, setPage] = useState("main");

    const addToFavorites = (movie) => {
        setFavorites((oldElements) => [...oldElements, movie]);
    };

    const removeFromFavorites = (movie) => {
        setFavorites(favorites.filter((element) => element !== movie));
    };

    const addToWatched = (movie) => {
        setWatched((oldElements) => [...oldElements, movie]);
    };

    const removeFromWatched = (movie) => {
        setWatched(watched.filter((element) => element !== movie));
    };

    // called on change to searchTerm
    const updateSearch = () => {
        // clears displayed movies and sets page number to fetch to 1, then loads new results
        displayMovies([], 1);
    };

    // fetch currentPage of now playing movies, display currentMovies + new results
    const fetchNowPlaying = (currentMovies, currentPage) => {
        const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&include_adult=false&page=${currentPage}&api_key=${import.meta.env.VITE_API_KEY}`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        };

        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                setMovieData([...currentMovies, ...json.results]);
                setPageNum(currentPage + 1);
            })
            .catch((error) => console.error(error));
    };

    // fetch currentPage of search results, display currentMovies + new results
    const fetchSearchResults = (currentMovies, currentPage) => {
        const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&language=en-US&include_adult=false&page=${currentPage}&api_key=${import.meta.env.VITE_API_KEY}`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        };

        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                setMovieData([...currentMovies, ...json.results]);
                setPageNum(currentPage + 1);
            })
            .catch((error) => console.error(error));
    };

    // fetch and display currentPage of either now playing movies or search results, appending to currentMovies
    // params are optional: default to state variables movieData and pageNum
    const displayMovies = (currentMovies, currentPage) => {
        // if search term is empty, load now playing
        if (searchTerm === "") {
            fetchNowPlaying(
                currentMovies != undefined ? currentMovies : movieData,
                currentPage != undefined ? currentPage : pageNum,
            );

            // otherwise, load movies whose titles contain searchTerm
        } else {
            fetchSearchResults(
                currentMovies != undefined ? currentMovies : movieData,
                currentPage != undefined ? currentPage : pageNum,
            );
        }
    };

    const showModal = (movieId) => {
        setModalDataId(movieId);
        document.querySelector("body").style.overflow = "hidden";
    };

    const hideModal = () => {
        setModalDataId(null);
        document.querySelector("body").style.overflow = "scroll";
    };

    // load data on component mount
    useEffect(displayMovies, []);

    // clear and refetch data on change to searchTerm
    useEffect(updateSearch, [searchTerm]);

    return (
        <>
            <header>
                <h1>Flixster</h1>
            </header>
            <main>
                <Sidebar
                    page={page}
                    setPage={setPage}></Sidebar>
                {page === "main" ? (
                    <div className="page-container">
                        <section className="filter-sort-bar">
                            <SearchBar updateSearch={setSearchTerm}></SearchBar>
                            <SortDropdown
                                movieData={movieData}
                                setMovieData={setMovieData}></SortDropdown>
                        </section>

                        <MovieList
                            movieData={movieData}
                            fetchMovieData={displayMovies}
                            showModal={showModal}
                            hideModal={hideModal}
                            favorites={favorites}
                            addFavorite={addToFavorites}
                            removeFavorite={removeFromFavorites}
                            watched={watched}
                            addWatched={addToWatched}
                            removeWatched={removeFromWatched}></MovieList>
                        <Modal
                            movieId={modalDataId}
                            hideModal={hideModal}></Modal>
                    </div>
                ) : page === "favorites" ? (
                    <div className="page-container">
                        <NoClickMovieList
                            movieData={favorites}></NoClickMovieList>
                    </div>
                ) : (
                    <div className="page-container">
                        <NoClickMovieList
                            movieData={watched}></NoClickMovieList>
                    </div>
                )}
            </main>
            <footer>
                <img
                    src={TMDBLogo}
                    alt="Logo of The Movie Database"></img>
                <p>
                    This product uses the TMDB API but is not endorsed or
                    certified by TMDB.
                </p>
            </footer>
        </>
    );
};

export default App;
