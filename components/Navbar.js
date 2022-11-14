import React, { useEffect } from "react";
import Image from "next/image";

import logo from "../public/logo.png";
import user from "../public/cuenta.png";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const { scrollYProgress, scrollY } = useScroll();
  const color = useTransform(
    scrollY,
    [0, 500],
    ["rgba(0,0,0,0.1)", "rgba(0,0,0,0.9)"]
  );
  useEffect(() => {
    console.log(scrollYProgress);
  }, [scrollYProgress]);

  return (
    <motion.div
      style={{ backgroundColor: color }}
      className={` flex justify-between fixed items-center px-4 sm:px-10 w-full z-50  `}
    >
      <Link href="/">
        <div className="relative w-24 sm:w-28 md:w-32 cursor-pointer">
          <Image src="/logo.png" width={300} height={200} layout="responsive" />
        </div>
      </Link>

      <Link href="/profile">
        <div className="relative h-10 w-10 md:h-12 md:w-12 cursor-pointer">
          <Image
            src="/cuenta.png"
            width={300}
            height={300}
            layout="responsive"
          />
        </div>
      </Link>
    </motion.div>
  );
}
