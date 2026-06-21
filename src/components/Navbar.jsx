"use client";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;
  // console.log(user);

  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href={"/"} className="font-semibold">
                  Home
                </Link>
              </li>
              <li>
                <Link href={"/tutors"} className="font-semibold">
                  Tutor
                </Link>
              </li>
              <li>
                <Link href={"/add-tutor"} className="font-semibold">
                  Add Tutor
                </Link>
              </li>
              <li>
                <Link href={"/my-tutors"} className="font-semibold">
                  My Tutors
                </Link>
              </li>
              <li>
                <Link href={"/my-booked-sessions"} className="font-semibold">
                  My Booked Sessions
                </Link>
              </li>
            </ul>
          </div>
          <Image
            src="/assets/logo.png"
            alt="logo image"
            width={150}
            height={10}
            className=""
          ></Image>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={"/"} className="font-semibold hover:bg-transparent">
                Home
              </Link>
            </li>
            <li>
              <Link
                href={"/tutors"}
                className="font-semibold hover:bg-transparent"
              >
                Tutors
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    href={"/add-tutor"}
                    className="font-semibold hover:bg-transparent"
                  >
                    Add Tutor
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/my-tutors"}
                    className="font-semibold hover:bg-transparent"
                  >
                    My Tutors
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/my-booked-sessions"}
                    className="font-semibold hover:bg-transparent"
                  >
                    My Booked Sessions
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <ThemeToggle></ThemeToggle>
          {user ? (
            <>
              {/* <Avatar>
                <Avatar.Image referrerPolicy="no-referrer" src={user?.image} />
                <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
              </Avatar> */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar ring-2 ring-primary ring-offset-2 ring-offset-base-100"
                >
                  <div className="w-10 rounded-full">
                    <Image
                      alt={user.name}
                      src={user?.image}
                      width={10}
                      height={10}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-1 w-64 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl"
                >
                  <div className="px-3 py-3 border-b border-base-300">
                    <h3 className="font-bold text-base">{user?.name}</h3>
                    <p className="text-xs text-base-content/60 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <li className="mt-2">
                    <Link href="/my-profile"> My Profile</Link>
                  </li>

                  <div className="divider my-1"></div>

                  <li>
                    <button
                      onClick={handleSignOut}
                      className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link href={"/login"}>
                <button className="btn bg-[#6b57ff] text-white hover:bg-[#5d49f9]">
                  Login
                </button>
              </Link>
              <Link href={"/signup"}>
                <button className="btn bg-[#6b57ff] text-white hover:bg-[#5d49f9]">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
