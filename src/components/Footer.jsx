import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#F8F6FF] dark:bg-slate-900 mt-20">
      <footer className="footer sm:footer-horizontal text-base-content py-10 container mx-auto">

        {/* Logo + Description */}
        <aside>
          <Image
            src="/assets/logo.png"
            width={200}
            height={100}
            alt="logo image"
          />
          <p className="dark:text-slate-300">
          MediQueue is your trusted platform
          <br />
          to find expert tutors and book
          <br></br>
          sessions online anytime, anywhere
        </p>
        </aside>

        <nav className="dark:text-slate-300">
          <h6 className="footer-title">Tutor Services</h6>
          <Link href={'/tutors'} className="link link-hover">Find Tutors</Link>
          <Link href={'/tutors'} className="link link-hover">Book Sessions</Link>
          <Link href={'/tutors'} className="link link-hover">Online Classes</Link>
          <Link href={'/tutors'} className="link link-hover">Home Tutoring</Link>
        </nav>

        <nav className="dark:text-slate-300">
          <h6 className="footer-title">Learning Services</h6>
          <a className="link link-hover">Math Help</a>
          <a className="link link-hover">Science Coaching</a>
          <a className="link link-hover">Language Learning</a>
          <a className="link link-hover">Exam Preparation</a>
        </nav>

        <nav className="dark:text-slate-300">
          <h6 className="footer-title">Contact</h6>
          <a className="link link-hover">Email: support@mediqueue.com</a>
          <a className="link link-hover">Phone: +880 1XXXXXXXXX</a>
          <a className="link link-hover">Dhaka, Bangladesh</a>
          <a className="link link-hover">Help Center</a>
        </nav>

        <nav className="dark:text-slate-300">
          <h6 className="footer-title">Legal & Social</h6>
          <a className="link link-hover">Terms of Use</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Refund Policy</a>
          <a className="link link-hover">Facebook</a>
          <a className="link link-hover">LinkedIn</a>
        </nav>

      </footer>

      {/* Copyright */}
      <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-slate-700">
        © {new Date().getFullYear()} MediQueue. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;