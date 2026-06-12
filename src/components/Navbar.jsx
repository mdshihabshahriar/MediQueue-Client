import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-base-100 shadow-sm">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href={"/"} className="font-semibold">Home</Link>
              </li>
              <li>
                <Link href={"/tutor"} className="font-semibold">Tutor</Link>
              </li>
              <li>
                <Link href={"/add-tutor"} className="font-semibold">Add Tutor</Link>
              </li>
              <li>
                <Link href={"/my-tutors"} className="font-semibold">My Tutors</Link>
              </li>
              <li>
                <Link href={"/booked"} className="font-semibold">My Booked Sessions</Link>
              </li>
            </ul>
          </div>
          <Image
            src="/assets/logo.PNG"
            alt="logo image"
            width={150}
            height={10}
            className=""
          ></Image>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={"/"} className="font-semibold hover:bg-transparent">Home</Link>
            </li>
            <li>
              <Link href={"/tutor"} className="font-semibold hover:bg-transparent">Tutor</Link>
            </li>
            <li>
              <Link href={"/add-tutor"} className="font-semibold hover:bg-transparent">Add Tutor</Link>
            </li>
            <li>
              <Link href={"/my-tutors"} className="font-semibold hover:bg-transparent">My Tutors</Link>
            </li>
            <li>
              <Link href={"/booked"} className="font-semibold hover:bg-transparent">My Booked Sessions</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end"> 
            <button className="btn bg-[#6b57ff] text-white hover:bg-[#5d49f9]">Login</button>
            <button className="btn bg-[#6b57ff] text-white hover:bg-[#5d49f9]">Register</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
