import React from "react";

import Head from "next/head";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Row from "../components/Row";

import { requests } from "../helpers/requests";

import { useSession } from "next-auth/react";

import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import NoPlan from "components/NoPlan";

const Home = () => {
  const { data: session } = useSession();

  if (session && session.user.planStatus === "No-plan") {
    return <NoPlan />;
  }

  if (session && session.user.planStatus === "Plan") {
    return (
      <div
        className={`relative pb-8 bg-opacity-100 bg-neutral-900 overflow-hidden`}
      >
        <Head>
          <title>Netflix Clone</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />

        <Banner />

        <div className="-mt-20 pb-40  flex flex-col space-y-20">
          {requests.map((req) => (
            <Row
              title={req.title}
              fetchURL={req.fetchURL}
              isLargeRow={req.isLargeRow}
              key={req.title}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Home;

export async function getServerSideProps(context) {
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
