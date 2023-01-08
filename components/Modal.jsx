import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiFillLike, AiOutlinePlus } from "react-icons/ai";
import {
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
  BsPlay,
} from "react-icons/bs";
import ReactPlayer from "react-player/youtube";

function Modal({ modalState, closeTrailerModal }) {
  const { movie } = modalState;

  const [trailerMovie, setTrailerMovie] = useState(undefined);
  const [trailerKey, setTrailerKey] = useState(undefined);

  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await axios.get(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_MOVIES_KEY
        }&language=en-US&append_to_response=videos `
      );

      console.log(data.data);

      setTrailerMovie(data.data);

      const regex = /Official Trailer/;

      const video = data.data.videos.results.find((el) => {
        return regex.test(el.name);
      });

      const video2 = data.data.videos.results.find((el) => {
        return el.type === "Trailer";
      });

      if (video) {
        setTrailerKey(video.key);
      } else if (video2) {
        setTrailerKey(video2.key);
      } else if (data.data.videos.results.lenght === 0) {
        setTrailerKey(data.data.videos.results[0].key);
      }
    };

    fetchMovie();
  }, [movie]);

  return (
    <div
      className={`fixed top-0 left-0 w-screen min-h-screen   py-8 z-[150] flex justify-center scrollbar-hide `}
    >
      <div className="w-full sm:w-4/5 md:w-2/3  relative z-[200] rounded-lg overflow-hidden ">
        <div className="w-full h-80 relative ">
          <div className="absolute  bottom-4 left-0 w-full   flex justify-between px-6">
            <div className="flex gap-x-8">
              <div>
                <button className="bg-white text-black flex px-6 py-2 items-center rounded-md">
                  <BsPlay className="text-2xl" />
                  <span className="text-lg font-semibold">Play</span>
                </button>
              </div>

              <div className="flex gap-x-4">
                <button className="w-11 h-11 border-2 border-white flex items-center justify-center rounded-full bg-neutral-900">
                  <AiOutlinePlus className="text-white text-2xl" />
                </button>

                <button className="w-11 h-11 border-2 border-white flex items-center justify-center rounded-full bg-neutral-900">
                  <AiFillLike className="text-white text-2xl" />
                </button>
              </div>
            </div>

            <div>
              <div>
                {muted ? (
                  <button
                    onClick={() => setMuted(!muted)}
                    className="w-11 h-11 border-2 border-white flex items-center justify-center rounded-full bg-neutral-900"
                  >
                    <BsFillVolumeMuteFill className="text-white text-2xl" />
                  </button>
                ) : (
                  <button
                    onClick={() => setMuted(!muted)}
                    className="w-11 h-11 border-2 border-white flex items-center justify-center rounded-full bg-neutral-900"
                  >
                    <BsFillVolumeUpFill className="text-white text-2xl" />
                  </button>
                )}
              </div>
            </div>
          </div>
          {trailerKey ? (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailerKey}`}
              width="100%"
              height="100%"
              playing
              muted={muted}
            />
          ) : (
            <div className="w-full h-full text-white flex justify-center items-center text-3xl bg-neutral-900">
              No trailer available
            </div>
          )}
        </div>
        <div className=" bg-neutral-900 text-white p-3 sm:p-5 md:p-8 flex flex-col gap-y-8 overflow-y-scroll h-64">
          <div className=" flex gap-x-4 text-sm">
            <div className="text-emerald-500">
              {Math.ceil(trailerMovie?.vote_average * 10)}% Match
            </div>
            <div>{trailerMovie?.release_date}</div>
            <div className="px-2  border border-white inline-block rounded-md">
              HD
            </div>
          </div>

          <div className="text-sm">{trailerMovie?.overview}</div>
          <div className="text-sm flex flex-col gap-y-2">
            <div>
              <span className="text-gray-400">Genres: </span>{" "}
              {trailerMovie?.genres.map((g) => g.name).join(", ")}
            </div>
            <div>
              {" "}
              <span className="text-gray-400">Original language:</span>{" "}
              {trailerMovie?.original_language}
            </div>
            <div>
              <span className="text-gray-400">Total votes:</span>{" "}
              {trailerMovie?.vote_count}
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute top-0 left-0 bg-black bg-opacity-50 w-full h-full z-[0]"
        onClick={closeTrailerModal}
      />
    </div>
  );
}

export default Modal;
