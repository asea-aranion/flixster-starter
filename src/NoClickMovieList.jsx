import { useEffect, useState } from "react";
import NoClickMovieCard from "./NoClickMovieCard";

const NoClickMovieList = (props) => {
    return (
        <div className="movie-list">
            {props.movieData.map((movie) => (
                <NoClickMovieCard
                    movie={movie}
                    key={movie.id}></NoClickMovieCard>
            ))}
        </div>
    );
};

export default NoClickMovieList;
