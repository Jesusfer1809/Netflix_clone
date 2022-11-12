import React, { useState, useEffect } from "react";
import axios from "../helpers/axios.js";
import Carousel from "react-elastic-carousel";

const breakPoints = [
  { width: 1, itemsToShow: 1, itemsToScroll: 1 },
  { width: 400, itemsToShow: 2, itemsToScroll: 2 },
  { width: 550, itemsToShow: 3, itemsToScroll: 3 },
  { width: 670, itemsToShow: 4, itemsToScroll: 4 },
  { width: 768, itemsToShow: 5, itemsToScroll: 5 },
];

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

  return (
    <div className=" mx-2 md:mx-8 my-14">
      <h2 className="text-white text-2xl mb-6">{title}</h2>

      <Carousel
        breakPoints={breakPoints}
        pagination={false}
        renderArrow={({ type, onClick }) => (
          <div
            onClick={onClick}
            className=" bg-opacity-50 bg-gray-900  w-8 text-xl text-white flex items-center justify-center cursor-pointer selection:bg-transparent"
          >
            {type === "PREV" ? "<-" : "->"}
          </div>
        )}
        enableSwipe={true}
      >
        {movies?.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                loading="lazy"
                src={`${baseURL}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                key={movie.id}
                className={`${
                  isLargeRow ? "max-h-64" : "max-h-36"
                } mr-4  cursor-pointer transition-all hover:scale-105 object-contain  `}
              />
            )
        )}
      </Carousel>
    </div>
  );
}
