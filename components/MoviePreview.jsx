import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { AiOutlineDown } from "react-icons/ai";

function MoviePreview({ isLargeRow, movie }) {
  const baseURL = "https://image.tmdb.org/t/p/original/";

  const [info, setInfo] = useState(false);

  const openInfo = () => {
    setInfo(true);
  };
  const closeInfo = () => {
    setInfo(false);
  };

  return (
    <motion.div
      className={` ${
        isLargeRow ? " w-[125px]" : " w-[250px] "
      }   shrink-0  relative`}
      onMouseEnter={openInfo}
      onMouseLeave={closeInfo}
    >
      <div
        className={` ${
          isLargeRow ? " h-[175px] " : "h-[140px]  "
        }  cursor-pointer relative  rounded-md overflow-hidden `}
      >
        <Image
          src={`${baseURL}${
            isLargeRow ? movie.poster_path : movie.backdrop_path
          }`}
          layout="fill"
        />
      </div>
      <AnimatePresence>
        {info && (
          <motion.div
            className={` absolute top-0 ${
              isLargeRow ? "-left-1/2" : "left-0"
            } w-[250px]  rounded-md overflow-hidden z-[90] `}
            whileHover={{ scale: 1.3, boxShadow: "0px 10px 15px -3px black" }}
            whileFocus={{ scale: 1.3 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            exit={{ scale: 1, transition: { delay: 0.2, duration: 0.3 } }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              exit={{ opacity: 0, transition: { delay: 0.2, duration: 0.3 } }}
              className={` h-[140px]  cursor-pointer relative z-[90]  `}
            >
              <Image src={`${baseURL}${movie.backdrop_path}`} layout="fill" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              exit={{ opacity: 0, transition: { delay: 0.2, duration: 0.3 } }}
              className={`w-full h-max bg-neutral-900 text-white relative z-[90] p-2 flex items-center justify-between space-x-4`}
            >
              <div>{movie.name || movie.title}</div>
              <div>
                <div className="rounded-full border border-white flex p-1">
                  <AiOutlineDown />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default MoviePreview;
