import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Logo from "./Logo";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="bg-base-200">
      <footer className="footer lg:footer-horizontal text-base-content p-10 items-center w-11/12 mx-auto">
        <aside>
          <Logo></Logo>
          <p className="md:text-xl">"Where Gardeners Bloom Together."</p>
        </aside>
        <nav>
          <h6 className="footer-title">Contract</h6>
          <a className="link link-hover">Email: info@gardennest.com</a>
          <a className="link link-hover">Phone: +1 (123) 456-7890</a>
          <a className="link link-hover">Address: 123 Main St, City, Country</a>
          <Link to={"/contact"} className="link link-hover">Help Center</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Browse</h6>
          <Link className="link link-hover" to={"/aboutUs"}>
            About Us
          </Link>
          <Link className="link link-hover" to={"/contact"}>
            Contact
          </Link>
          <Link className="link link-hover" to={"/ExploreGardeners"}>
            Explore Gardeners
          </Link>
          <Link className="link link-hover" to={"/BrowseTips"}>
            Browse Tips
          </Link>
        </nav>
        <nav className="space-y-2">
          <h6 className="footer-title">Social</h6>
          <a
            className="link link-hover"
            href="https://www.facebook.com/"
            target="_blank"
          >
            <span className="flex items-center gap-2">
              <FaFacebook size={20}></FaFacebook>Facebook
            </span>
          </a>
          <a className="link link-hover" href="http://x.com/" target="_blank">
            <span className="flex items-center gap-2">
              <FaTwitter size={20}></FaTwitter>Twitter
            </span>
          </a>
          <a
            className="link link-hover"
            href="https://www.instagram.com/"
            target="_blank"
          >
            <span className="flex items-center gap-2">
              <FaInstagram size={20}></FaInstagram>Instagram
            </span>
          </a>
          <a
            className="link link-hover"
            href="https://github.com/"
            target="_blank"
          >
            <span className="flex items-center gap-2">
              <FaGithub size={20}></FaGithub>GitHub
            </span>
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
