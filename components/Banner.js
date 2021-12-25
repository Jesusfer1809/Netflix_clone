import React from "react";
import { useEffect, useState } from "react";
import requests from "../helpers/requests";
import axios from "../helpers/axios.js";

export default function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const req = await axios.get(
        "https://api.themoviedb.org/3" + requests.fetchNetflixOriginals
      );

      setMovie(
        req.data.results[Math.floor(Math.random() * req.data.results.length)]
      );

      return req;
    };

    fetchData();
  }, []);

  return (
    <div
      className=" relative w-full h-screen"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3) 50%,rgba(0,0,0,0.5) 80%,rgba(0,0,0,1) 100%), url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        position: "relative",
      }}
    >
      <div className=" absolute top-1/2 left-1/4 -translate-x-1/4 lg:-translate-x-1/2 -translate-y-1/2 w-full px-8 sm:w-2/3 sm:px-0 lg:w-2/5 ">
        <span className=" text-white inline-block text-6xl font-semibold">
          {movie?.name || movie?.original_name}
        </span>

        <div className=" mt-8 flex justify-start">
          <button className=" text-white text-xl bg-slate-700 bg-opacity-60 px-4 py-1 shadow-md shadow-slate-900 rounded-sm ml-12">
            Play
          </button>
          <button className=" text-white text-xl bg-slate-700 bg-opacity-60 px-4 py-1 shadow-md shadow-slate-900 rounded-sm ml-12">
            My List
          </button>
        </div>

        <p className="text-white inline-block mt-8 text-md">
          {movie?.overview}
        </p>
      </div>
    </div>
  );
}
