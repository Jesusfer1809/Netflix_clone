import React, { useState, useEffect } from "react";
import axios from "../helpers/axios.js";

export default function Row({ title, fetchURL, isLargeRow = false }) {
  const [movies, setMovies] = useState();
  const baseURL = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchMovies = async () => {
      const req = await axios.get("https://api.themoviedb.org/3" + fetchURL);

      setMovies(req.data.results);

      return req;
    };
    fetchMovies();
  }, [fetchURL]);

  console.log(movies);

  return (
    <div className="ml-8 my-14">
      <h2 className="text-white text-2xl mb-4">{title}</h2>

      <div className="flex overflow-y-hidden overflow-x-scroll scrollbar scrollbar-none ">
        {movies?.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                src={`${baseURL}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                key={movie.id}
                className={`${
                  isLargeRow ? "max-h-64" : "max-h-36"
                } mr-4 cursor-pointer transition-all hover:scale-105 object-contain  `}
              />
            )
        )}
      </div>
    </div>
  );
}
