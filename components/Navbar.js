import React from "react";
import Image from "next/image";

import logo from "../public/logo.png";
import user from "../public/cuenta.png";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className=" flex justify-between items-center px-10 fixed w-full z-10  ">
      <Link href="/">
        <img src="/logo.png" className=" h-20 object-cover cursor-pointer " />
      </Link>

      <Link href="/profile">
        <img src="/cuenta.png" className=" h-12 w-12 cursor-pointer" />
      </Link>
    </div>
  );
}
