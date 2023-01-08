import React from "react";

import { useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Row from "../components/Row";

import { requests } from "../helpers/requests";

import { useSession } from "next-auth/react";

import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

import NoPlan from "components/NoPlan";
import axios from "axios";
import Modal from "components/Modal";

const Home = ({ allMovies }) => {
  const { data: session } = useSession();

  const [modal, setModal] = useState({
    isOpen: false,
    movie: undefined,
  });

  const openTrailerModal = (movie) => {
    setModal({
      isOpen: true,
      movie,
    });
  };

  const closeTrailerModal = () => {
    setModal({
      isOpen: false,
      movie: undefined,
    });
  };

  if (session && session.user.planStatus === "No-plan") {
    return <NoPlan />;
  }

  if (session && session.user.planStatus === "Plan") {
    return (
      <div
        className={`font-lato relative pb-8 bg-opacity-100 bg-neutral-900 overflow-hidden z-[0]`}
      >
        <Head>
          <title>Netflix Clone</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {modal.isOpen && (
          <Modal
            modalState={modal}
            openTrailerModal={openTrailerModal}
            closeTrailerModal={closeTrailerModal}
          />
        )}
        <Navbar />

        <Banner openTrailerModal={openTrailerModal} />

        <div className="-mt-20 pb-40  flex flex-col space-y-20 relative ">
          {allMovies.map((row) => (
            <Row
              title={row.title}
              isLargeRow={row.isLargeRow}
              key={row.title}
              movies={row.movies}
              openTrailerModal={openTrailerModal}
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

  const result = await Promise.all(
    requests.map(async (r) => {
      return await axios.get(r.fetchURL);
    })
  );

  const [
    originals,
    trending,
    top,
    action,
    comedy,
    horror,
    romance,
    documentaries,
  ] = result.map((r) => r.data.results);

  return {
    props: {
      allMovies: [
        { movies: originals, title: "NETFLIX ORIGINALS", isLargeRow: true },
        { movies: trending, title: "Trending Now", isLargeRow: false },
        { movies: top, title: "Top Rated", isLargeRow: false },
        { movies: action, title: "Action Movies", isLargeRow: false },
        { movies: comedy, title: "Comedy Movies", isLargeRow: false },
        { movies: horror, title: "Horror Movies", isLargeRow: false },
        { movies: romance, title: "Romance Movies", isLargeRow: false },
        { movies: documentaries, title: "Documentaries", isLargeRow: false },
      ],
    },
  };
}
