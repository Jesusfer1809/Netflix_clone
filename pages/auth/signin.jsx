import React from "react";

import { FcGoogle } from "react-icons/fc";

import { getCsrfToken, getProviders, signIn } from "next-auth/react";

import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

function signin({ providers, csrfToken }) {
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7) 30%,rgba(0,0,0,0.6) 60%,rgba(0,0,0,0.7) 100%), url(https://assets.nflxext.com/ffe/siteui/vlv3/3679b63e-5d92-47a1-96ec-b26d86fc0f0a/d78af455-3db4-46ba-bf30-626909f337ea/PE-es-20211213-popsignuptwoweeks-perspective_alpha_website_medium.jpg)`,
      }}
    >
      <Head>
        <title>Netflix Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center px-4 sm:px-8 md:px-10">
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
      </div>

      <div className="text-white py-12 px-4 flex items-center justify-center ">
        <div className="w-full sm:w-4/5 md:w-3/5 lg:w-1/2 bg-black/70 text-center p-4 md:p-6 lg:p-8">
          <h1 className=" block text-left text-2xl  md:text-3xl font-semibold mb-10">
            Sign In
          </h1>

          <form className=" flex flex-col items-center">
            <input
              type="email"
              // ref={emailRef}
              placeholder="Email or phone number"
              className=" w-full mb-6 py-2 md:py-3 px-4 rounded bg-zinc-700 outline-none placeholder-gray-400"
            />
            <input
              type="password"
              // ref={passwordRef}
              placeholder="Password"
              className=" w-full mb-10 py-2 md:py-3 px-4 rounded bg-zinc-700 outline-none placeholder-gray-400"
            />

            <button className=" w-full py-2 md:py-3 px-4 rounded font-semibold transition-all text-white md:text-lg bg-[#de0611] hover:bg-[#f40612] mb-6">
              Sign In
            </button>

            <div className="border-y border-gray-800 w-full mb-6 py-2">or</div>

            <button
              onClick={(e) => {
                e.preventDefault();
                signIn(providers.google.id, { callbackUrl: "/" });
              }}
              className="flex items-center justify-center space-x-2 w-full py-2 md:py-3 px-4 rounded font-semibold transition-all text-white md:text-lg border-2 border-[#de0611] hover:border-[#f40612] mb-6"
            >
              <FcGoogle />
              <span>Sign in with Google</span>
            </button>

            <div className="block w-full text-left text-sm md:text-base ">
              <span className=" text-gray-400 mr-2">New to Netflix?</span>
              <span className=" border-transparent border-b-2 hover:border-white cursor-pointer transition-all ">
                Sign Up now
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default signin;

export async function getServerSideProps(context) {
  const { authOptions } = require("../api/auth/[...nextauth]");
  const { unstable_getServerSession } = require("next-auth/next");
  const { req, res } = context;

  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: { providers, csrfToken },
  };
}
