import React from "react";
import Image from "next/image";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSession } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSidebarMenuStore } from "store/sidebarMenuStore";
import { useWindowSize } from "hooks/useWindowSize";

export default function Navbar({ inIndex }) {
  const [width, _] = useWindowSize();

  const { scrollY } = useScroll();
  const openSidebarMenu = useSidebarMenuStore((state) => state.openSidebarMenu);
  const { data: session } = useSession();
  const color = useTransform(
    scrollY,
    [0, 200],
    ["rgba(24,24,27,0)", "rgba(24,24,27,1)"]
  );

  return (
    session && (
      <motion.div
        style={{ backgroundColor: color }}
        className={` flex  fixed top-0 left-0 ${
          inIndex
            ? " pl-8 pr-4 sm:px-10 justify-between sm:justify-end"
            : "px-4 sm:px-10 justify-between"
        }  items-center w-full z-[100]  `}
      >
        {width < 640 ? (
          <div onClick={openSidebarMenu} className="text-white sm:hidden">
            <GiHamburgerMenu className="text-3xl" />
          </div>
        ) : null}

        <Link href="/">
          <div className="relative w-24 h-20 sm:w-28 md:w-32 2xl:w-44 cursor-pointer">
            <Image
              src="/logo.png"
              width={300}
              height={200}
              layout="responsive"
              objectFit="contain"
              priority
            />
          </div>
        </Link>

        {!inIndex && (
          <Link href="/profile">
            <div className="relative h-10 w-10 md:h-12 md:w-12 2xl:w-16 2xl:h-16 cursor-pointer rounded-sm overflow-hidden">
              <Image src={session.user.image} layout="fill" />
            </div>
          </Link>
        )}
      </motion.div>
    )
  );
}
