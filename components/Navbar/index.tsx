import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Dropdown from "./Dropdown";
import { BiMenu, BiX } from "react-icons/bi";

export const Navbar = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const navigation = [
    { text: "Home", path_name: "/" },
    { text: "Mint", path_name: "/mint" },
    { text: "Rarity", path_name: "/rarity" },
    { text: "Marketplace", path_name: "/marketplace" },
  ];

  return (
    <>
      <div className="absolute w-full z-10">
        <div className="grid grid-cols-4 py-8 container mx-auto px-10">
          <div className="flex items-center col-span-2 lg:col-span-1">
            <Image src="/logo.png" height="42" width="45"></Image>
            <h1 className="font-bold text-white text-xl ml-5">PMSC</h1>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="cursor-pointer col-span-2 lg:col-span-1 lg:hidden flex justify-end items-center"
          >
            {open ? (
              <BiX fill="white" className="h-8 w-8" />
            ) : (
              <BiMenu fill="white" className="h-8 w-8" />
            )}
          </div>
          <div
            className={`items-center lg:mt-0 mt-5 lg:text-base text-sm col-span-4 font-medium lg:space-x-3 ${
              open ? "grid" : "hidden"
            } lg:flex grid-col-1 lg:backdrop-blur-none border-2 lg:border-0 lg:bg-inherit lg:space-y-0 border-white backdrop-blur-sm bg-black/70 space-y-3 p-3 lg:p-0 rounded-lg lg:flex-row lg:col-span-2 lg:justify-center`}
          >
            {navigation.map((nav) => (
              <Link href={nav.path_name}>
                <span
                  className={`${
                    router.pathname === nav.path_name
                      ? "bg-white text-black font-semibold"
                      : "text-slate-200"
                  } py-2 px-6 capitalize rounded-lg cursor-pointer border-2 hover:border-white border-transparent duration-100`}
                >
                  {nav.text}
                </span>
              </Link>
            ))}
          </div>
          <div
            className={`${
              open ? "block" : "hidden"
            } col-span-4 lg:col-span-1 relative lg:mt-0 mt-5 lg:block  lg:justify-self-end `}
          >
            <Dropdown />
          </div>
        </div>
      </div>
    </>
  );
};
