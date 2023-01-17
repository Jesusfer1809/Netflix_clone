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
import Modal from "components/Modal";
import SideBar from "components/SideBar";
import { AnimatePresence } from "framer-motion";
import MobileSidebar from "components/MobileSidebar";

const Home = () => {
  const { data: session } = useSession();

  const [modal, setModal] = useState({
    isOpen: false,
    movie: undefined,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

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
        <AnimatePresence>
          {modal.isOpen && (
            <Modal
              modalState={modal}
              openTrailerModal={openTrailerModal}
              closeTrailerModal={closeTrailerModal}
            />
          )}
        </AnimatePresence>

        <div>
          <SideBar
            isOpen={isMenuOpen}
            openMenu={openMenu}
            closeMenu={closeMenu}
          />
          <MobileSidebar
            isOpen={isMenuOpen}
            openMenu={openMenu}
            closeMenu={closeMenu}
          />
          <div className="relative  sm:pl-16 lg:pl-20 ">
            <Navbar inIndex={true} openMenu={openMenu} />

            <Banner openTrailerModal={openTrailerModal} />

            <main className="-mt-10 pb-40  flex flex-col gap-y-24 relative overflow-x-hidden z-[40]">
              {requests.map((request) => (
                <Row
                  title={request.title}
                  isLargeRow={request.isLargeRow}
                  key={request.title}
                  fetchURL={request.fetchURL}
                  openTrailerModal={openTrailerModal}
                />
              ))}
            </main>
          </div>
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
