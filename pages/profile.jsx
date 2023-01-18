import React from "react";
import Navbar from "../components/Navbar";

import { useSession, signOut } from "next-auth/react";

import Head from "next/head";
import Image from "next/image";

import Router, { useRouter } from "next/router";
import { checkout } from "utils/checkout";

export default function profile() {
  const { data: session } = useSession();
  const router = useRouter();

  // const handleImage = async () => {
  //   const res = await axios.patch("http://localhost:3000/api/users");
  //   router.reload();
  // };

  const renewal =
    session?.user.planStatus === "Plan"
      ? new Date(session?.user.planExpiresAt).toDateString()
      : "Not purchased";

  return (
    session && (
      <div className=" bg-slate-900">
        <Head>
          <title>Netflix Clone</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />

        <div className="flex flex-col justify-center items-center min-h-screen py-20 sm:py-24 md:py-32">
          <div className="text-white p-4 md:p-0 w-full md:w-2/3  lg:w-1/2 flex flex-col space-y-8">
            <h1 className="block text-2xl sm:text-3xl lg:text-4xl font-medium border-b-2  border-opacity-5 border-white pb-1">
              Edit Profile: <span className="ml-2">{session.user.name}</span>
            </h1>

            <div className="flex space-x-2 sm:space-x-6 items-center w-full">
              <div
                className=" w-20 h-20 sm:w-28 sm:h-28 relative rounded-sm overflow-hidden "
                // onClick={handleImage}
              >
                <Image src={session.user.image} layout="fill" />
              </div>

              <div className=" col-span-6 sm:col-span-5 h-auto flex-grow">
                <span className="block bg-gray-100/30 px-4 py-2 mb-4">
                  {session.user.email}
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-6 ">
              <h2 className="text-lg md:text-xl border-b-2 pb-1 border-opacity-5 border-white">
                Plans (Current status:{" "}
                <span className="ml-2">
                  {session.user.planStatus === "Plan"
                    ? "Basic Plan"
                    : session.user.planStatus}
                </span>
                )
              </h2>

              <p className="md:text-lg">
                Renewal date: <span className="ml-2">{renewal}</span>
              </p>

              <div className="flex flex-col space-y-8 px-4 sm:px-8 py-8">
                <div className="flex justify-between ">
                  <div className="flex flex-col ">
                    <span>Netflix Basic</span>
                    <span className="text-xs">4K+HDR</span>
                  </div>

                  {session.user.planStatus === "Plan" ? (
                    <button
                      className="cursor-pointer px-4  font-semibold text-white bg-gray-500 rounded-sm"
                      disabled
                    >
                      Current Package
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        checkout({
                          user: session.user,
                          lineItems: [
                            {
                              price: "price_1M5f2cInbRLxPfHZ551yXs4K",
                              quantity: 1,
                            },
                          ],
                        })
                      }
                      className="cursor-pointer px-4  font-semibold text-white  bg-[#de0611] hover:bg-[#f40612] rounded-sm"
                    >
                      Subscribe
                    </button>
                  )}
                </div>
                {/* <div className="flex justify-between ">
                  <div className="flex flex-col ">
                    <span>Netflix Standard</span>
                    <span className="text-xs">1080p</span>
                  </div>

                  <button className="cursor-pointer px-4  font-semibold text-white  bg-[#de0611] hover:bg-[#f40612] rounded-sm">
                    Subscribe
                  </button>
                </div>

                <div className="flex justify-between ">
                  <div className="flex flex-col ">
                    <span>Netflix Basic</span>
                    <span className="text-xs">420p</span>
                  </div>

                  <button className="cursor-pointer px-4  font-semibold text-white  bg-[#de0611] hover:bg-[#f40612] rounded-sm">
                    Subscribe
                  </button>
                </div>

                <div className="flex justify-between ">
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
                </div> */}
              </div>

              <button
                className="cursor-pointer block w-full py-3 md:py-4  font-semibold text-white text-lg bg-[#de0611] hover:bg-[#f40612] text-center  rounded"
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
