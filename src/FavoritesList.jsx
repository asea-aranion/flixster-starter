import { useEffect, useState } from "react";
import FavoriteMovieCard from "./FavoriteMovieCard";

const FavoritesList = (props) => {
    return (
        <div className="movie-list">
            {props.favorites.map((movie) => (
                <FavoriteMovieCard
                    movie={movie}
                    key={movie.id}></FavoriteMovieCard>
            ))}
        </div>
    );
};

export default FavoritesList;
