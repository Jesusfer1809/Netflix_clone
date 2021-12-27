import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { auth } from "../helpers/firebase";
import { useRouter } from "next/router";
import { updateUser } from "../store/actions/userAction";

import { signOut } from "firebase/auth";

import { useSelector, useDispatch } from "react-redux";

function profile() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((userAuth) => {
      if (!userAuth) {
        dispatch(updateUser(null));

        router.push("/login");
      }
    });

    return unsuscribe;
  }, []);

  const logOut = (e) => {
    e.preventDefault();
    signOut(auth);
  };

  return (
    <div className="h-screen relative bg-slate-900">
      <Navbar />

      <div className="text-white w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <h1 className="block text-4xl font-medium border-b-2  border-opacity-5 border-white pb-1 mb-8">
          Edit Profile
        </h1>

        <div className="grid  grid-cols-6  gap-x-8">
          <img src="/cuenta.png" className="w-full cursor-pointer" />

          <div className=" col-span-5 h-auto">
            <span className="block bg-gray-400 px-4 py-2 mb-4">
              {user?.email}
            </span>

            <h2 className="text-xl border-b-2 pb-1 border-opacity-5 border-white">
              Plans (Current Plan: Premium)
            </h2>
          </div>

          <div className=" col-start-2 col-span-5 pt-4">
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
              onClick={logOut}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profile;
