import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-50 mt-20">
    <footer className="footer sm:footer-horizontal text-base-content py-10 container mx-auto">
      <aside>
        <Image src='/assets/logo.PNG' width={200} height={100} alt="logo image"></Image>
        <p>
          MediQueue is your trusted platform
          <br />
          to find expert tutors and book
          <br></br>
          sessions online anytime, anywhere
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
    </div>
  );
};

export default Footer;
