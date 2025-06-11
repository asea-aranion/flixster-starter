import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";

// Represents 1 movie without modal onclick; displays poster, title, and rating average
const NoClickMovieCard = (props) => {
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

export default NoClickMovieCard;
