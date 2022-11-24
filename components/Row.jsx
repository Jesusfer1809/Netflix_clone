import React, { useState, useEffect } from "react";
import axios from "axios";

import Image from "next/image.js";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { motion } from "framer-motion";
import MoviePreview from "./MoviePreview.jsx";

export default function Row({ title, fetchURL, isLargeRow = false }) {
  const [movies, setMovies] = useState();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isLargeRow ? 6 : 4,
    slidesToScroll: isLargeRow ? 5 : 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: isLargeRow ? 6 : 3,
          slidesToScroll: isLargeRow ? 4 : 2,
          dots: false,
          infinite: true,
          speed: 500,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: isLargeRow ? 5 : 3,
          slidesToScroll: isLargeRow ? 3 : 2,
          dots: false,
          infinite: true,
          speed: 500,
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: isLargeRow ? 5 : 2,
          slidesToScroll: isLargeRow ? 3 : 1,
          dots: false,
          infinite: true,
          speed: 500,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: isLargeRow ? 4 : 2,
          slidesToScroll: isLargeRow ? 2 : 1,
          dots: false,
          infinite: true,
          speed: 500,
        },
      },
      {
        breakpoint: 630,
        settings: {
          slidesToShow: isLargeRow ? 3 : 1,
          slidesToScroll: isLargeRow ? 1 : 1,
          dots: false,
          infinite: true,
          speed: 500,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: isLargeRow ? 2 : 1,
          slidesToScroll: isLargeRow ? 1 : 1,
          dots: false,
          infinite: true,
          speed: 500,
        },
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: isLargeRow ? 1 : 1,
          slidesToScroll: isLargeRow ? 1 : 1,
          dots: false,
          infinite: true,
          speed: 500,
        },
      },
    ],
  };

  const baseURL = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchMovies = async () => {
      const req = await axios.get(fetchURL);

      setMovies(req.data.results);

      return req;
    };
    fetchMovies();
  }, [fetchURL]);

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
