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
import Modal from "./Modal";

export default function Row({
  title,
  movies,
  isLargeRow = true,
  openTrailerModal,
}) {
  const settings = getSettings(true);

  return (
    <div className=" mx-8 lg:mx-12">
      <h2 className="text-white text-xl 2xl:text-2xl font-medium mb-8 -ml-4 md:-ml-2">
        {title}
      </h2>

      <Slider {...settings}>
        {movies?.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <MoviePreview
                isLargeRow={true}
                movie={movie}
                key={movie.name || movie.title}
                openTrailerModal={openTrailerModal}
              />
            )
        )}
      </Slider>
    </div>
  );
}
