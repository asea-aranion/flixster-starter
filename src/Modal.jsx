import { useEffect, useRef, useState } from "react";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

const Modal = (props) => {
    const overlayRef = useRef(null);

    const [details, setDetails] = useState(null);

    const handleOverlayClick = (event) => {
        if (event.target == overlayRef.current) {
            props.hideModal();
        }
    };

    const fetchMovieDetails = () => {
        if (props.movieId != null) {
            setDetails(null);
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
                .catch((error) => console.error(error));

            const videosUrl = `https://api.themoviedb.org/3/movie/${props.movieId}/videos?language=en-US&api_key=${import.meta.env.VITE_API_KEY}`;

            fetch(videosUrl, options)
                .then((response) => response.json())
                .then((json) => {
                    for (let video of json.results) {
                        if (
                            video.type === "Trailer" &&
                            video.site === "YouTube"
                        ) {
                            setDetails((old) => {
                                return { ...old, video: video.key };
                            });
                            break;
                        }
                    }
                })
                .catch((error) => console.error(error));
        }
    };

    const getDateString = (date) => {
        return new Date(date).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    useEffect(fetchMovieDetails, [props.movieId]);

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
                        <p>
                            {details.genres
                                .map((genre) => genre.name)
                                .join(" | ")}
                        </p>
                        <p>{details.overview}</p>
                        {details.video ? (
                            <iframe
                                width={560}
                                height={315}
                                src={`https://www.youtube.com/embed/${details.video}`}></iframe>
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
