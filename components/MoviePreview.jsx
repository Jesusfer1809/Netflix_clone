import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { AiOutlineDown } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";

function MoviePreview({ isLargeRow, movie, openTrailerModal }) {
  const baseURL = "https://image.tmdb.org/t/p/original/";

  const [info, setInfo] = useState(false);

  const openInfo = () => {
    setInfo(true);
  };
  const closeInfo = () => {
    setInfo(false);
  };

  return (
    <>
      <motion.div
        className={` shrink-0   relative shadow-md hidden lg:block `}
        onMouseEnter={openInfo}
        onMouseLeave={closeInfo}
      >
        <div
          className={` w-72 cursor-pointer relative rounded-md overflow-hidden `}
        >
          <Image
            src={`${baseURL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            width={500}
            height={500}
            layout="responsive"
            objectFit="contain"
            unoptimized
          />
        </div>
        <AnimatePresence>
          {info && (
            <motion.div
              className={` absolute top-1/2  left-0 rounded-md overflow-hidden z-[90] `}
              initial={{
                translateY: "-50%",
                opacity: 0,
                scale: 1,
              }}
              whileHover={{
                scale: 1.2,
                translateY: "-50%",
                boxShadow: "0px 10px 15px -3px black",
                opacity: 1,
              }}
              transition={{ delay: 0.3, duration: 0.4 }}
              exit={{
                scale: 1,
                opacity: 0,
                transition: { delay: 0.2, duration: 0.3 },
              }}
            >
              <motion.div className={`w-96   cursor-pointer relative z-[90]  `}>
                <Image
                  src={`${baseURL}${movie.backdrop_path}`}
                  width={700}
                  height={390}
                  objectFit="contain"
                  layout="responsive"
                  unoptimized
                />
              </motion.div>
              <motion.div
                className={`w-full h-max bg-neutral-900 text-white relative z-[90] p-3 flex items-center justify-between gap-x-8`}
              >
                <div className="flex flex-col gap-y-2">
                  <div>{movie.name || movie.title}</div>
                  <div className="text-xs line-clamp-3 text-neutral-400">
                    {movie.overview}
                  </div>
                </div>

                <div>
                  <div
                    className="rounded-full border border-white flex items-center justify-center p-1 cursor-pointer"
                    onClick={() => openTrailerModal(movie)}
                  >
                    <BsFillPlayFill className="text-2xl" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className={` shrink-0   relative shadow-md lg:hidden `}
        onClick={() => openTrailerModal(movie)}
      >
        <div
          className={` w-72 cursor-pointer relative rounded-md overflow-hidden `}
        >
          <Image
            src={`${baseURL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            width={500}
            height={500}
            layout="responsive"
            objectFit="contain"
            unoptimized
          />
        </div>
      </motion.div>
    </>
  );
}

export default MoviePreview;
