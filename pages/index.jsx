import React from "react";

import Head from "next/head";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Row from "../components/Row";

import requests from "../helpers/requests";

import { useSession } from "next-auth/react";
import { checkout } from "../utils/checkout";

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
          <Row
            title="NETFLIX ORIGINALS"
            fetchURL={requests.fetchNetflixOriginals}
            isLargeRow
          />

          <Row title="Trending Now" fetchURL={requests.fetchTrending} />

          <Row title="Top Rated" fetchURL={requests.fetchTrending} />

          <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />

          <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />

          <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />

          <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />

          <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
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
