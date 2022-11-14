import React from "react";
import Navbar from "../components/Navbar";

import { useSession, signOut } from "next-auth/react";

import Head from "next/head";
import Image from "next/image";

function profile() {
  const { data: session } = useSession();

  return (
    session && (
      <div className="flex flex-col justify-center relative h-[130vh] bg-slate-900">
        <Head>
          <title>Netflix Clone</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="absolute top-0 left-0  w-full">
          <Navbar />
        </div>

        <div className="text-white p-8 md:p-0 w-full md:w-2/3  lg:w-1/2 h-max  self-center   ">
          <h1 className="block text-4xl font-medium border-b-2  border-opacity-5 border-white pb-1 mb-8">
            Edit Profile
          </h1>

          <div className="grid  grid-cols-6  gap-x-8">
            <div className="w-full h-full relative rounded-sm overflow-hidden ">
              <Image src={session.user.image} layout="fill" />
            </div>

            <div className=" col-span-6 sm:col-span-5 h-auto">
              <span className="block bg-gray-400 px-4 py-2 mb-4">
                {session.user.email}
              </span>

              <h2 className="text-xl border-b-2 pb-1 border-opacity-5 border-white">
                Plans (Current Plan: Premium)
              </h2>
            </div>

            <div className=" col-start-1 sm:col-start-2 col-span-6 sm:col-span-5 pt-4">
              <span>Renewal date: 04/03/21</span>

              <div className="flex justify-between px-4 py-2 my-4">
                <div className="flex flex-col ">
                  <span>Netflix Standard</span>
                  <span className="text-xs">1080p</span>
                </div>

                <button className="cursor-pointer px-4  font-semibold text-white  bg-[#de0611] hover:bg-[#f40612] rounded-sm">
                  Subscribe
                </button>
              </div>

              <div className="flex justify-between px-4 py-2 my-4">
                <div className="flex flex-col ">
                  <span>Netflix Basic</span>
                  <span className="text-xs">420p</span>
                </div>

                <button className="cursor-pointer px-4  font-semibold text-white  bg-[#de0611] hover:bg-[#f40612] rounded-sm">
                  Subscribe
                </button>
              </div>

              <div className="flex justify-between px-4 py-2 my-4 mb-10">
                <div className="flex flex-col ">
                  <span>Netflix Premium</span>
                  <span className="text-xs">4K+HDR</span>
                </div>

                <button
                  className="cursor-pointer px-4  font-semibold text-white bg-gray-500 rounded-sm"
                  disabled
                >
                  Current Package
                </button>
              </div>

              <button
                className="cursor-pointer block w-full py-4  font-semibold text-white text-lg bg-[#de0611] hover:bg-[#f40612] text-center  rounded"
                onClick={signOut}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default profile;

export async function getServerSideProps(context) {
  const { authOptions } = require("./api/auth/[...nextauth]");
  const { unstable_getServerSession } = require("next-auth/next");
  const { req, res } = context;

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
