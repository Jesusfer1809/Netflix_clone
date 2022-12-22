import React, { useEffect } from "react";
import Image from "next/image";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { scrollYProgress, scrollY } = useScroll();
  const { data: session } = useSession();
  const color = useTransform(
    scrollY,
    [0, 500],
    ["rgba(0,0,0,0.1)", "rgba(0,0,0,0.9)"]
  );

  return (
    session && (
      <motion.div
        style={{ backgroundColor: color }}
        className={` flex justify-between fixed items-center px-4 sm:px-10 w-full z-[999]  `}
      >
        <Link href="/">
          <div className="relative w-24 sm:w-28 md:w-32 cursor-pointer">
            <Image
              src="/logo.png"
              width={300}
              height={200}
              layout="responsive"
            />
          </div>
        </Link>
        <span className="text-white">a</span>
        <Link href="/profile">
          <div className="relative h-10 w-10 md:h-12 md:w-12 cursor-pointer rounded-sm overflow-hidden">
            <Image src={session.user.image} layout="fill" />
          </div>
        </Link>
      </motion.div>
    )
  );
}
