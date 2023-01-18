import React, { useState } from "react";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineSearch,
} from "react-icons/ai";
import { TbDoorExit } from "react-icons/tb";
import { AnimatePresence, motion } from "framer-motion";
import SidebarLinks from "./SidebarLinks";

function MobileSidebar({ isOpen, openMenu, closeMenu }) {
  const { data: session } = useSession();

  return (
    <motion.div
      className={` sm:hidden ${
        isOpen ? "w-1/2 " : "w-0"
      }  duration-700  h-screen fixed top-0 left-0 bg-zinc-900  text-white z-[200]`}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.3 } }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex flex-col justify-between pl-4"
          >
            <div
              onClick={closeMenu}
              className="absolute top-4 -right-4 border-2 border-white text-white text-2xl p-1 rounded-full cursor-pointer"
            >
              <AiOutlineLeft />
            </div>
            <motion.div className={`flex flex-col w-full pt-20   gap-y-8`}>
              <SidebarLinks isOpen={isOpen} title={"Profile"} href="/profile">
                <Image src={session.user.image} layout="fill" />
              </SidebarLinks>

              <SidebarLinks isOpen={isOpen} title={"Home"} gray href="/">
                <AiOutlineHome className="text-2xl" />
              </SidebarLinks>

              <SidebarLinks
                isOpen={isOpen}
                title={"Search"}
                gray
                href="/search"
              >
                <AiOutlineSearch className="text-2xl" />
              </SidebarLinks>

              <SidebarLinks isOpen={isOpen} title={"My list"} gray href="/list">
                <AiOutlineHeart className="text-2xl" />
              </SidebarLinks>
            </motion.div>

            <div className="flex flex-col w-full pb-10   gap-y-8">
              <div onClick={signOut} className="flex items-center gap-x-6">
                <div className="shrink-0  h-10 w-10 md:h-12 md:w-12 2xl:w-16 2xl:h-16 text-white flex justify-center items-center bg-slate-700 bg-opacity-50 rounded-md">
                  <TbDoorExit className="text-2xl" />
                </div>

                <div className="text-xl shrink-0">Log out</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default MobileSidebar;
