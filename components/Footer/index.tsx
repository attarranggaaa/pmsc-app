import React from "react";
import { SiTwitter, SiInstagram, SiDiscord, SiLinktree } from "react-icons/si";

export const Footer = () => {
  return (
    <>
      <div className="absolute bottom-0 w-full">
        <div className="container mx-auto px-10 py-8 text-white font-bold text-xl flex md:justify-start justify-center">
          <div className="flex space-x-10">
            <a href="" className="opacity-50 hover:opacity-100">
              <SiTwitter className="h-6 w-6" />
            </a>
            <a href="/" className="opacity-50 cursor-default hover:opacity-100">
              <SiInstagram className="h-6 w-6" />
            </a>
            <a href="" className="opacity-50">
              <SiDiscord className="h-6 w-6" />
            </a>
            <a href="" className="opacity-50 hover:opacity-100">
              <SiLinktree className="h-6 w-6" />
            </a>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};
