"use client";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import toast from "react-hot-toast";

const Navbar = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;
  // console.log(user);

  const router = useRouter();

  const pathName = usePathname();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    toast.success("Logout Successful");
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
              className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow bg-white dark:bg-slate-900"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#6b57ff] text-white font-bold overflow-hidden">
                {user?.image ? (
                  <Image
                    alt={user.name}
                    src={user.image}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span>{user?.name?.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold">Menu</span>
                <ThemeToggle />
              </div>
              <li>
                <Link
                  href={"/"}
                  className={`font-semibold bg-transparent ${
                    pathName === "/"
                      ? "text-[#6b57ff] dark:text-[#8b7bff]"
                      : "hover:text-[#6b57ff]"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={"/tutors"}
                  className={`font-semibold bg-transparent ${
                    pathName === "/tutors"
                      ? "text-[#6b57ff] dark:text-[#8b7bff]"
                      : "hover:text-[#6b57ff]"
                  }`}
                >
                  Tutor
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link
                      href={"/add-tutor"}
                      className={`font-semibold bg-transparent ${
                        pathName === "/add-tutor"
                          ? "text-[#6b57ff] dark:text-[#8b7bff]"
                          : "hover:text-[#6b57ff]"
                      }`}
                    >
                      Add Tutor
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/my-tutors"}
                      className={`font-semibold bg-transparent ${
                        pathName === "/my-tutors"
                          ? "text-[#6b57ff] dark:text-[#8b7bff]"
                          : "hover:text-[#6b57ff]"
                      }`}
                    >
                      My Tutors
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/my-booked-sessions"}
                      className={`font-semibold bg-transparent ${
                        pathName === "/my-booked-sessions"
                          ? "text-[#6b57ff] dark:text-[#8b7bff]"
                          : "hover:text-[#6b57ff]"
                      }`}
                    >
                      My Booked Sessions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/my-profile"}
                      className={`font-semibold bg-transparent ${
                        pathName === "/my-profile"
                          ? "text-[#6b57ff] dark:text-[#8b7bff]"
                          : "hover:text-[#6b57ff]"
                      }`}
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut} className="btn btn-error">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <div className="divider my-2"></div>
                  <div className="flex flex-col gap-2 px-2 mt-1">
                    <Link href={"/login"} className="w-full">
                      <button className="btn w-full border-[#6b57ff] text-[#6b57ff] hover:text-white hover:bg-[#5d49f9]">
                        Login
                      </button>
                    </Link>
                    <Link href={"/signup"} className="w-full">
                      <button className="btn w-full border-[#6b57ff] text-[#6b57ff] hover:text-white hover:bg-[#5d49f9]">
                        Register
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </ul>
          </div>
          <Link href={"/"}>
            <Image
              src="/assets/logo.png"
              alt="logo image"
              width={150}
              height={10}
            ></Image>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                href={"/"}
                className={`font-semibold hover:bg-transparent ${
                  pathName === "/"
                    ? "text-[#6b57ff] dark:text-[#8b7bff]"
                    : "hover:text-[#6b57ff]"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={"/tutors"}
                className={`font-semibold bg-transparent ${
                  pathName === "/tutors"
                    ? "text-[#6b57ff] dark:text-[#8b7bff]"
                    : "hover:text-[#6b57ff]"
                }`}
              >
                Tutors
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    href={"/add-tutor"}
                    className={`font-semibold hover:bg-transparent ${
                      pathName === "/add-tutor"
                        ? "text-[#6b57ff] dark:text-[#8b7bff]"
                        : "hover:text-[#6b57ff]"
                    }`}
                  >
                    Add Tutor
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/my-tutors"}
                    className={`font-semibold hover:bg-transparent ${
                      pathName === "/my-tutors"
                        ? "text-[#6b57ff] dark:text-[#8b7bff]"
                        : "hover:text-[#6b57ff]"
                    }`}
                  >
                    My Tutors
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/my-booked-sessions"}
                    className={`font-semibold hover:bg-transparent ${
                      pathName === "/my-booked-sessions"
                        ? "text-[#6b57ff] dark:text-[#8b7bff]"
                        : "hover:text-[#6b57ff]"
                    }`}
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
        <div className="navbar-end gap-2 hidden lg:flex">
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
                    {user?.image ? (
                      <Image
                        alt={user.name}
                        src={user?.image}
                        width={10}
                        height={10}
                      />
                    ) : (
                      <span>{user?.name?.charAt(0).toUpperCase()}</span>
                    )}
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
                <button className="btn border-[#6b57ff] text-[#6b57ff] hover:text-white hover:bg-[#5d49f9]">
                  Login
                </button>
              </Link>
              <Link href={"/signup"}>
                <button className="btn border-[#6b57ff] text-[#6b57ff] hover:text-white hover:bg-[#5d49f9]">
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
