import React, { useState, useEffect } from "react";
import axios from "axios";

import Image from "next/image.js";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getSettings } from "../utils/slickBreakpoints";

import { motion } from "framer-motion";
import MoviePreview from "./MoviePreview.jsx";

import { useQuery } from "@tanstack/react-query";

export default function Row({ title, fetchURL, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const req = await axios.get(fetchURL);

    return req.data;
  };

  const settings = getSettings(isLargeRow);

  const { isLoading, error, data } = useQuery({
    queryKey: [title],
    queryFn: getMovies,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setMovies(data.results);
  }, [data]);
  // const movies = data?.results;

  if (isLoading)
    return <span className="text-lg md:text-xl text-white">Loading...</span>;

  if (error)
    return (
      <p className="text-lg md:text-xl text-white">
        An error has occurred: {error.message}{" "}
      </p>
    );

  return (
    <div className=" mx-8 lg:mx-12">
      <h2 className="text-white text-xl font-medium mb-6 -ml-4 md:-ml-2">
        {title}
      </h2>

      <Slider {...settings}>
        {movies?.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <MoviePreview
                isLargeRow={isLargeRow}
                movie={movie}
                key={movie.name || movie.title}
              />
            )
        )}
      </Slider>
    </div>
  );
}
