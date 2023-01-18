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
import Modal from "components/Modal";
import SideBar from "components/SideBar";
import MobileSidebar from "components/MobileSidebar";

const Home = () => {
  const { data: session } = useSession();

  if (session && session.user.planStatus === "No-plan") {
    return <NoPlan />;
  }

  if (session && session.user.planStatus === "Plan") {
    return (
      <div
        className={`font-lato relative pb-8 bg-opacity-100 bg-neutral-900 overflow-hidden `}
      >
        <Head>
          <title>Netflix Clone</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Modal />

        <SideBar />
        <MobileSidebar />
        <div className="relative  sm:pl-16 lg:pl-20 ">
          <Navbar inIndex={true} />

          <Banner />

          <main className="-mt-10 pb-40  flex flex-col gap-y-24 relative overflow-x-hidden z-[40]">
            {requests.map((request) => (
              <Row
                title={request.title}
                key={request.title}
                fetchURL={request.fetchURL}
              />
            ))}
          </main>
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
