import React from "react";
import Image from "next/image";

import logo from "../public/logo.png";
import user from "../public/cuenta.png";

export default function Navbar() {
  return (
    <div className=" flex flex-row justify-between items-center h-20 lg:h-24 px-8 fixed w-full z-10  ">
      <img src="/logo.png" className=" h-full" />

      <img src="/cuenta.png" className=" h-12 w-12" />
    </div>
  );
}
