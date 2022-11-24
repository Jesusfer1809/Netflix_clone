import React from "react";
import { useEffect, useState } from "react";
import { requests } from "../helpers/requests";
import axios from "axios";

import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { useQuery } from "@tanstack/react-query";

export default function Banner() {
  const [movie, setMovie] = useState({});

  const getMovies = async () => {
    const req = await axios.get(requests[0].fetchURL);
    console.log(req.data);
    return req.data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["bannerMovies"],
    queryFn: getMovies,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    console.log("CHANGING");
    setMovie(data?.results[Math.floor(Math.random() * data.results.length)]);
  }, [data]);

  if (isLoading)
    return <div className="  w-full h-screen  flex items-center"></div>;

  if (error)
    return (
      <p className="text-lg md:text-xl text-white">
        An error has occurred: {error.message}{" "}
      </p>
    );

  return (
    <div
      className="  w-full h-screen  flex items-center"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundImage:
          movie &&
          `linear-gradient(rgba(23,23,23,0.3) 50%,rgba(23,23,23,0.5) 70%,rgba(23,23,23,8) 100%), url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
      }}
    >
      <div className="  w-full px-4 md:px-8 sm:w-2/3  lg:w-1/2 ">
        <span className=" text-white inline-block text-4xl sm:text-5xl lg:text-6xl font-semibold">
          {movie?.name || movie?.original_name}
        </span>

        <div className=" mt-8 flex justify-start space-x-6">
          <button className=" bg-white text-neutral-900 font-medium text-xl px-6 py-1 sm:py-2 sm:px-8 md:px-10 shadow-sm shadow-slate-900 rounded-sm flex items-center space-x-2 ">
            <BsFillPlayFill />
            <span>Play</span>
          </button>
          <button className="bg-gray-500 bg-opacity-80 text-white font-medium text-xl px-6 py-1 sm:py-2 sm:px-8 md:px-10 shadow-sm shadow-slate-900 rounded-sm flex items-center space-x-2">
            <AiOutlineInfoCircle />
            <span>More info</span>
          </button>
        </div>

        <p className="text-white font-medium inline-block mt-8 text-sm md:text-base line-clamp-3">
          {movie?.overview}
        </p>
      </div>
    </div>
  );
}
