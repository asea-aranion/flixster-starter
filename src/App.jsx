import { useState, useEffect, useRef } from "react";
import "./App.css";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";
import Modal from "./Modal";

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");

    // next page with new results for now playing or search
    const [pageNum, setPageNum] = useState(1);

    // array of fetched movies
    const [movieData, setMovieData] = useState(Array());

    // movie being shown in modal; null when modal is hidden
    const [modalData, setModalData] = useState(null);

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

    const showModal = (movieData) => {
        setModalData(movieData);
        document.querySelector("body").style.overflow = "hidden";
    };

    const hideModal = () => {
        setModalData(null);
        document.querySelector("body").style.overflow = "scroll";
    };

    // load data on component mount
    useEffect(displayMovies, []);

    // clear and refetch data on change to searchTerm
    useEffect(updateSearch, [searchTerm]);

    return (
        <>
            <SearchBar updateSearch={setSearchTerm}></SearchBar>
            <MovieList
                movieData={movieData}
                fetchMovieData={displayMovies}
                showModal={showModal}
                hideModal={hideModal}></MovieList>
            <Modal
                movie={modalData}
                hideModal={hideModal}></Modal>
        </>
    );
};

export default App;
