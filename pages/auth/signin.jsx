import React from "react";

import { FcGoogle } from "react-icons/fc";

import { getCsrfToken, getProviders, signIn } from "next-auth/react";

import Link from "next/link";
import Head from "next/head";

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
      <div className="flex justify-between items-center px-10">
        <Link href="/">
          <img src="/logo.png" className=" h-20 object-cover cursor-pointer" />
        </Link>
      </div>

      <div className="text-white w-1/3 py-12 px-16 bg-black/70 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-center ">
        <h1 className=" block text-left text-3xl font-semibold mb-10">
          Sign In
        </h1>

        <form className=" flex flex-col items-center">
          <input
            type="email"
            // ref={emailRef}
            placeholder="Email or phone number"
            className=" w-full mb-6 py-3 px-4 rounded bg-zinc-700 outline-none placeholder-gray-400"
          />
          <input
            type="password"
            // ref={passwordRef}
            placeholder="Password"
            className=" w-full mb-10 py-3 px-4 rounded bg-zinc-700 outline-none placeholder-gray-400"
          />

          <button className=" w-full py-3 px-4 rounded font-semibold transition-all text-white text-lg bg-[#de0611] hover:bg-[#f40612] mb-6">
            Sign In
          </button>

          <div className="border-y border-gray-800 w-full mb-6 py-2">or</div>

          <button
            onClick={(e) => {
              e.preventDefault();
              signIn(providers.google.id, { callbackUrl: "/" });
            }}
            className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded font-semibold transition-all text-white text-lg border-2 border-[#de0611] hover:border-[#f40612] mb-6"
          >
            <FcGoogle />
            <span>Sign in with Google</span>
          </button>

          <p className="block w-full text-left">
            <span className=" text-gray-400 mr-2">New to Netflix?</span>
            <span className=" border-transparent border-b-2 hover:border-white cursor-pointer transition-all ">
              Sign Up now
            </span>
          </p>
        </form>
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
