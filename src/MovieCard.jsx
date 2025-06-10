import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { useEffect, useState } from "react";

// Represents 1 movie; displays poster, title, and rating average
const MovieCard = (props) => {
    // own state variables to avoid setting parent's state during rendering
    const [favorited, setFavorited] = useState(props.isFavorited);
    const [watched, setWatched] = useState(props.isWatched);

    // toggles whether this movie is in App's favorites array
    const updateFavorite = () => {
        // if just unfavorited, remove from array
        if (!favorited) {
            props.removeFavorite(props.movie);
            // otherwise, add to array
        } else {
            props.addFavorite(props.movie);
        }
    };

    // toggles whether this movie is in App's watched array
    const updateWatched = () => {
        // if just marked as not watched, remove from array
        if (!watched) {
            props.removeWatched(props.movie);
            // otherwise, add to array
        } else {
            props.addWatched(props.movie);
        }
    };

    // update App's state whenever heart icon is toggled
    useEffect(updateFavorite, [favorited]);

    // update App's state whenever eye icon is toggled
    useEffect(updateWatched, [watched]);

    return (
        <div
            className="movie-card"
            onClick={() => props.showModal(props.movie.id)}>
            {props.movie.poster_path == null ? (
                <div className="card-background" />
            ) : (
                <img
                    src={`https://image.tmdb.org/t/p/w780/${props.movie.poster_path}`}
                    alt={`A poster for ${props.movie.title}`}></img>
            )}

            <div className="movie-info">
                <div className="movie-card-button-container">
                    {favorited ? (
                        <FavoriteRoundedIcon
                            sx={{
                                fontSize: "28px",
                                color: "rgb(101, 96, 171)",
                            }}
                            onClick={(event) => {
                                event.stopPropagation();
                                setFavorited(false);
                            }}></FavoriteRoundedIcon>
                    ) : (
                        <FavoriteBorderRoundedIcon
                            sx={{ fontSize: "28px" }}
                            onClick={(event) => {
                                event.stopPropagation();
                                setFavorited(true);
                            }}></FavoriteBorderRoundedIcon>
                    )}
                    {watched ? (
                        <VisibilityRoundedIcon
                            sx={{
                                fontSize: "28px",
                                color: "rgb(101, 96, 171)",
                            }}
                            onClick={(event) => {
                                event.stopPropagation();
                                setWatched(false);
                            }}></VisibilityRoundedIcon>
                    ) : (
                        <VisibilityOffRoundedIcon
                            sx={{ fontSize: "28px" }}
                            onClick={(event) => {
                                event.stopPropagation();
                                setWatched(true);
                            }}></VisibilityOffRoundedIcon>
                    )}
                </div>
                <h3>{props.movie.title}</h3>
                <div className="rating-info">
                    {props.movie.vote_average >= 7 ? (
                        <ArrowUpwardRoundedIcon></ArrowUpwardRoundedIcon>
                    ) : props.movie.vote_average >= 5 ? (
                        <HorizontalRuleRoundedIcon></HorizontalRuleRoundedIcon>
                    ) : (
                        <ArrowDownwardRoundedIcon></ArrowDownwardRoundedIcon>
                    )}
                    <p>{props.movie.vote_average}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
