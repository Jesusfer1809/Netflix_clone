import React, { useState, useEffect } from "react";
import axios from "../helpers/axios.js";
import Carousel from "react-elastic-carousel";
import Image from "next/image.js";

import { motion } from "framer-motion";

export default function Row({ title, fetchURL, isLargeRow = false }) {
  const [movies, setMovies] = useState();

  const breakPoints = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1 },
    {
      width: 350,
      itemsToShow: isLargeRow ? 2 : 1,
      itemsToScroll: isLargeRow ? 2 : 1,
    },
    {
      width: 550,
      itemsToShow: isLargeRow ? 3 : 2,
      itemsToScroll: isLargeRow ? 3 : 2,
    },
    {
      width: 650,
      itemsToShow: isLargeRow ? 4 : 3,
      itemsToScroll: isLargeRow ? 4 : 3,
    },
    {
      width: 900,
      itemsToShow: isLargeRow ? 5 : 4,
      itemsToScroll: isLargeRow ? 5 : 4,
    },
    {
      width: 1100,
      itemsToShow: isLargeRow ? 6 : 5,
      itemsToScroll: isLargeRow ? 6 : 5,
    },
  ];

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
            className=" bg-opacity-50 bg-gray-900  w-10 h-10 self-center rounded-full  text-xl text-white flex items-center justify-center cursor-pointer border border-white"
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
              <motion.div
                className={` ${
                  isLargeRow
                    ? " h-64 w-full max-w-[12rem]"
                    : "h-36 w-full max-w-[18rem] "
                }  cursor-pointer relative  mr-4 rounded-sm overflow-hidden `}
              >
                <Image
                  src={`${baseURL}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  layout="fill"
                />
              </motion.div>
            )
        )}
      </Carousel>
    </div>
  );
}
