import Link from "next/link";
import { SiTwitter, SiInstagram, SiDiscord, SiLinktree } from "react-icons/si";

export const Footer = () => {
  return (
    <>
      <div className="absolute bottom-0 w-full">
        <div className="container mx-auto px-10 py-4 md:py-8 text-white font-bold text-xl flex md:justify-start justify-center">
          <div className="flex space-x-10">
            <Link href="https://twitter.com/PMSCTY">
              <SiTwitter className="h-6 w-6 opacity-50 hover:opacity-100 cursor-pointer" />
            </Link>
            <Link href="https://instagram.com/pmscty">
              <SiInstagram className="h-6 w-6 opacity-50 hover:opacity-100 cursor-pointer" />
            </Link>
            <Link href="https://linktr.ee/pmscty">
              <SiLinktree className="h-6 w-6 opacity-50 hover:opacity-100 cursor-pointer" />
            </Link>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};
