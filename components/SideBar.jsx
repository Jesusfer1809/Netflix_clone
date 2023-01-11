import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineSearch,
} from "react-icons/ai";
import { TbDoorExit } from "react-icons/tb";
import { AnimatePresence, motion } from "framer-motion";

function SideBar({ isOpen, openMenu, closeMenu }) {
  const { data: session } = useSession();

  return (
    <motion.div
      className={`hidden  sm:flex flex-col justify-between   ${
        isOpen ? "w-1/3 lg:w-1/4 " : "sm:w-20 lg:w-24"
      }  duration-700 ease-in-out  h-screen fixed top-0 left-0 bg-zinc-900  text-white z-[100] sm:px-4 lg:px-6 rounded-lg`}
    >
      <div
        onClick={isOpen ? closeMenu : openMenu}
        className="absolute top-4 -right-4 border-2 border-white text-white text-2xl p-1 rounded-full cursor-pointer"
      >
        {isOpen ? <AiOutlineLeft /> : <AiOutlineRight />}
      </div>
      <div className={`flex flex-col w-full pt-20   gap-y-8`}>
        <Link href="/profile">
          <div className="flex items-center gap-x-6">
            <div className="shrink-0 relative h-10 w-10 md:h-12 md:w-12 2xl:w-16 2xl:h-16 cursor-pointer rounded-md overflow-hidden">
              <Image src={session.user.image} layout="fill" />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.3, delay: 0.1 },
                  }}
                  exit={{ opacity: 0 }}
                  className="text-2xl"
                >
                  Profile
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Link>

        <div className="flex items-center gap-x-6">
          <div className="shrink-0  h-10 w-10 md:h-12 md:w-12 2xl:w-16 2xl:h-16 text-white flex justify-center items-center bg-slate-700 bg-opacity-50 rounded-md">
            <AiOutlineSearch className="text-2xl" />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.3, delay: 0.1 },
                }}
                exit={{ opacity: 0 }}
                className="text-2xl"
              >
                Search
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-x-6">
          <div className="shrink-0  h-10 w-10 md:h-12 md:w-12 2xl:w-16 2xl:h-16 text-white flex justify-center items-center bg-slate-700 bg-opacity-50 rounded-md">
            <AiOutlineHeart className="text-2xl" />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.3, delay: 0.1 },
                }}
                exit={{ opacity: 0 }}
                className="text-2xl shrink-0"
              >
                My list
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col w-full pb-10   gap-y-8">
        <div onClick={signOut} className="flex items-center gap-x-6 ">
          <div className="shrink-0  h-10 w-10 md:h-12 md:w-12 2xl:w-16 2xl:h-16 text-white flex justify-center items-center bg-slate-700 bg-opacity-50 rounded-md">
            <TbDoorExit className="text-2xl" />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.3, delay: 0.1 },
                }}
                exit={{ opacity: 0 }}
                className="text-2xl shrink-0"
              >
                Log out
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default SideBar;
