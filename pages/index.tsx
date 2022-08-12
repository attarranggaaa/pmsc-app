import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-white text-center">
          <h1 className="font-bold md:text-5xl text-3xl">
            Polygon Monkey Society
          </h1>
          <p className="md:mt-8 mt-4 md:text-2xl text-md leading-normal text-slate-200">
            Polygon Monkey Society is a limited PFP collection of 666{" "}
            <br className="hidden md:block" />
            unique randomly generated Monkeys living on the{" "}
            <br className="hidden md:block" /> Polygon Blockchain.
          </p>
        </div>
        <div className="mt-10">
          <button className="duration-100 shadow-xl hover:shadow-white/20 shadow-[#7E24FA]/20 py-2 w-48 bg-[#7E24FA]  text-white rounded-lg font-semibold hover:bg-white hover:text-black">
            Mint
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
