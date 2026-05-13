import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { Logo } from "./logo";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground italic">
              "Where Gardeners Bloom Together."
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-green-600 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-green-600 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-green-600 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-green-600 transition-colors">
                <FaGithub size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">Email: info@gardennest.com</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Phone: +1 (123) 456-7890</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Address: 123 Main St, City, Country</li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">Help Center</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Browse</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
              </li>
              <li>
                <Link href="/explore-gardeners" className="hover:text-foreground transition-colors">Explore Gardeners</Link>
              </li>
              <li>
                <Link href="/browse-tips" className="hover:text-foreground transition-colors">Browse Tips</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to get latest gardening tips and event updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-background border rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Garden Nest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
