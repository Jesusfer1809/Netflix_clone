import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getSettings } from "../utils/slickBreakpoints";

import MoviePreview from "./MoviePreview.jsx";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Row({ title, fetchURL }) {
  const settings = getSettings(true);

  const fetchMovies = async () => {
    const res = await axios.get(fetchURL);

    return res.data.results;
  };

  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [title],
    queryFn: fetchMovies,

    refetchOnWindowFocus: false,
  });

  return (
    <div className=" mx-8 lg:mx-12">
      <h2 className="text-white text-xl 2xl:text-2xl font-medium mb-8 -ml-4 md:-ml-2">
        {title}
      </h2>

      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <Slider {...settings}>
          {movies?.map(
            (movie) =>
              movie.poster_path &&
              movie.backdrop_path && (
                <MoviePreview
                  isLargeRow={true}
                  movie={movie}
                  key={movie.name || movie.title}
                />
              )
          )}
        </Slider>
      )}
    </div>
  );
}
