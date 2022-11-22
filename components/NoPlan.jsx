import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";

import { useSession } from "next-auth/react";
import { checkout } from "../utils/checkout";

function NoPlan() {
  const { data: session } = useSession();

  return (
    <div
      className="min-h-screen relative bg-cover bg-[center center] flex flex-col"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7) 30%,rgba(0,0,0,0.6) 60%,rgba(0,0,0,0.7) 100%), url(https://assets.nflxext.com/ffe/siteui/vlv3/3679b63e-5d92-47a1-96ec-b26d86fc0f0a/d78af455-3db4-46ba-bf30-626909f337ea/PE-es-20211213-popsignuptwoweeks-perspective_alpha_website_medium.jpg)`,
      }}
    >
      <Head>
        <title>Netflix Clone </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <div className="text-white w-full flex justify-center items-center flex-grow">
        <div className="w-full sm:w-4/5 md:w-2/3 px-4 flex flex-col items-center text-center justify-center">
          <p className="text-lg mb-2 md:text-xl">
            Hi, <span>{session.user.name} !</span>
          </p>
          <h1 className=" text-3xl sm:text-4xl md:text-5xl block mb-8 font-bold">
            Unlimited movies, TV shows, and more.
          </h1>

          <h2 className=" text-xl sm:text-2xl md:text-3xl block mb-8 font-semibold">
            Watch anywhere. Cancel anytime.
          </h2>

          <button
            onClick={() => {
              console.log("CHECKOUT");
              checkout({
                user: session.user,
                lineItems: [
                  {
                    price: "price_1M5f2cInbRLxPfHZ551yXs4K",
                    quantity: 1,
                  },
                ],
              });
            }}
            className=" py-2  px-4 sm:px-6 sm:py-3 sm:text-lg md:text-xl rounded font-semibold transition-all text-white  bg-[#de0611] hover:bg-[#f40612]  "
          >
            Finish your subscription &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoPlan;
