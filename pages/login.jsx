import React from "react";
import Link from "next/link";

import { signIn } from "next-auth/react";

import Head from "next/head";
import Image from "next/image";

function login() {
  return (
    <div
      className="min-h-screen relative bg-cover bg-[center center] flex flex-col"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7) 30%,rgba(0,0,0,0.6) 60%,rgba(0,0,0,0.7) 100%), url(https://assets.nflxext.com/ffe/siteui/vlv3/3679b63e-5d92-47a1-96ec-b26d86fc0f0a/d78af455-3db4-46ba-bf30-626909f337ea/PE-es-20211213-popsignuptwoweeks-perspective_alpha_website_medium.jpg)`,
      }}
    >
      <Head>
        <title>Netflix Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-between items-center px-6 md:px-10">
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

        <button
          className=" px-3 py-2 text-sm md:px-4 md:text-base  font-semibold text-white rounded-sm bg-[#DE0611]"
          onClick={signIn}
        >
          Sign In
        </button>
      </div>

      <div className="text-white w-full flex justify-center items-center flex-grow">
        <div className="w-full md:w-2/3 px-4 flex flex-col items-center text-center justify-center">
          <h1 className=" text-3xl sm:text-4xl md:text-5xl block mb-8 font-bold">
            Unlimited movies, TV shows, and more.
          </h1>

          <h2 className=" text-xl sm:text-2xl md:text-3xl block mb-4 font-semibold">
            Watch anywhere. Cancel anytime.
          </h2>

          <h3 className=" text-sm sm:text-base md:text-lg block mb-8 md:font-medium">
            Ready to watch? Enter your email to create or restart your
            membership.
          </h3>

          <form className="w-4/5 lg:w-3/5 flex rounded-sm overflow-hidden">
            <input
              type="email"
              placeholder="Email address"
              className=" px-3 py-2 lg:py-3 lg:px-4 outline-none text-slate-900 text-sm sm:text-base md:text-lg flex-grow"
            />

            <Link href="/signin">
              <button className=" px-4 lg:px-6 font-semibold text-white text-sm sm:text-base md:text-lg bg-[#de0611] hover:bg-[#f40612]">
                Sign In
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default login;
