import React from "react";
import { useEffect, useState } from "react";
import { requests } from "../helpers/requests";
import axios from "axios";

import { BsFillPlayFill } from "react-icons/bs";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useTrailerModalStore } from "store/trailerModalStore";

export default function Banner() {
  const [movie, setMovie] = useState({});

  const openTrailerModal = useTrailerModalStore(
    (state) => state.openTrailerModal
  );

  const getMovies = async () => {
    const req = await axios.get(requests[0].fetchURL);

    return req.data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["bannerMovies"],
    queryFn: getMovies,

    refetchOnWindowFocus: false,
  });

  useEffect(() => {
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
    <div className="  w-full h-screen  relative flex items-center ">
      {/* BANNER BACKGROUND */}

      <div className="w-full h-full absolute top-0 left-0 z-[20]">
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <div
        className="w-full h-full absolute top-0 left-0 z-[30]"
        style={{
          backgroundImage: `linear-gradient(rgba(23,23,23,0) 50%,rgba(23,23,23,0.7) 70%,rgba(23,23,23,1) 100%),linear-gradient(to left,rgba(23,23,23,0) 30%,rgba(23,23,23,0.5) 60%,rgba(23,23,23,1) 100%)`,
        }}
      />

      {/* BANNER CONTENT */}

      <div className="  w-full px-4 md:px-8 sm:w-2/3  lg:w-1/2 relative z-[40]">
        <span className=" text-white inline-block text-4xl sm:text-5xl lg:text-5xl 2xl:text-6xl font-semibold">
          {movie?.title || movie?.original_title}
        </span>

        <p className="text-white font-sans font-medium inline-block mt-8 text-sm md:text-base 2xl:text-lg line-clamp-3">
          {movie?.overview}
        </p>

        <div className=" mt-8 ">
          <button
            onClick={() => openTrailerModal(movie)}
            className=" bg-white font-sans text-neutral-900 font-medium text-xl 2xl:text-2xl px-6 py-1 sm:py-2 sm:px-8 md:px-10 shadow-sm shadow-slate-900 rounded-sm flex items-center space-x-2 "
          >
            <BsFillPlayFill />
            <span>Play</span>
          </button>
        </div>
      </div>
    </div>
  );
}
