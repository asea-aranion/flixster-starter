import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

// Represents 1 movie; displays poster, title, and rating average
const MovieCard = (props) => {
    return (
        <div className="movie-card">
            <img
                src={`https://image.tmdb.org/t/p/w780/${props.movie.poster_path}`}></img>
            <div className="movie-info">
                <h3>{props.movie.title}</h3>
                <div className="rating-info">
                    {props.movie.vote_average >= 7 ? (
                        <ArrowUpwardRoundedIcon></ArrowUpwardRoundedIcon>
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
