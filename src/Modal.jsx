import { useEffect, useRef, useState } from "react";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

// Overlay and modal with further movie details
const Modal = (props) => {

    // reference to transparent overlay div behind modal
    const overlayRef = useRef(null);

    // detailed movie info (runtime, etc.)
    const [details, setDetails] = useState(null);

    // YouTube video id for trailer
    const [videoKey, setVideoKey] = useState(null);

    // hide modal if overlay itself (area outside modal) is clicked
    const handleOverlayClick = (event) => {
        if (event.target == overlayRef.current) {
            props.hideModal();
        }
    };

    // get detailed movie data and YouTube id for a trailer from TMDb
    const fetchMovieDetails = () => {
        if (props.movieId != null) {

            // clear old modal data
            setDetails(null);
            setVideoKey(null);

            // set up and fetch from details endpoint (runtime not accessible from now playing or search)
            const url = `https://api.themoviedb.org/3/movie/${props.movieId}?api_key=${import.meta.env.VITE_API_KEY}`;
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            };

            fetch(url, options)
                .then((response) => response.json())
                .then((json) => setDetails(json))
                .catch((error) => `Error fetching movie details in modal: ${console.error(error)}`);

            // set up and fetch from videos endpoint
            const videosUrl = `https://api.themoviedb.org/3/movie/${props.movieId}/videos?language=en-US&api_key=${import.meta.env.VITE_API_KEY}`;

            fetch(videosUrl, options)
                .then((response) => response.json())
                .then((json) => {

                    // iterate over videos array, looking for first YouTube trailer
                    for (let video of json.results) {
                        if (
                            video.type === "Trailer" &&
                            video.site === "YouTube"
                        ) {
                            setVideoKey(video.key);
                            break;
                        }
                    }
                })
                .catch((error) => `Error fetching movie trailer: ${console.error(error)}`);
        }
    };

    // reformat date from TMDb (e.g. 2025-05-07 to May 7, 2025)
    const getDateString = (date) => {
        return new Date(date).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    // reload data whenever movie being displayed in modal changes
    useEffect(fetchMovieDetails, [props.movieId]);

    // display modal after movie card is clicked (sets movieId) and after data is fetched
    if (props.movieId != null && details != null) {
        return (
            <div
                className="overlay"
                ref={overlayRef}
                style={{ display: props.movieId == null ? "none" : "block" }}
                onClick={handleOverlayClick}>
                <div className="modal">
                    <img
                        src={`https://image.tmdb.org/t/p/w1280/${details.backdrop_path}`}
                        alt={`A promotional image for ${details.title}`}></img>
                    <div className="gradient-img-overlay"></div>
                    <div className="modal-info">
                        <div className="modal-info-spacer"></div>
                        <h2>{details.title}</h2>
                        <div className="runtime-release-container">
                            <p>{details.runtime} minutes</p>
                            <CircleRoundedIcon
                                sx={{ fontSize: "10px" }}></CircleRoundedIcon>
                            <p>{getDateString(details.release_date)}</p>
                        </div>
                        {details.genres ? (
                            <p>
                                {details.genres
                                    .map((genre) => genre.name)
                                    .join(" | ")}
                            </p>
                        ) : (
                            <></>
                        )}

                        <p>{details.overview}</p>
                        {videoKey ? (
                            <iframe
                                width={560}
                                height={315}
                                src={`https://www.youtube.com/embed/${videoKey}`}></iframe>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
};

export default Modal;
