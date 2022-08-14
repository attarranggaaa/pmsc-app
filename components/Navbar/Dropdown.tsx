import React, { ReactNode } from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import {
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
  useAddress,
  useDisconnect,
} from "@thirdweb-dev/react";

const Dropdown = () => {
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();

  const wallets = [
    { name: "Metamask", connect: connectWithMetamask },
    { name: "Wallet Connect", connect: connectWithWalletConnect },
    { name: "Coinbase Wallet", connect: connectWithCoinbaseWallet },
  ];

  const address = useAddress();
  const disconnect = useDisconnect();

  return (
    <>
      {address ? (
        <Base name={address}>
          <Menu.Item>
            {() => (
              <Link href="/inventory">
                <span className="duration-100 text-left text-sm mt-2 hover:bg-white font-medium  rounded-md py-2 px-6 hover:text-black text-white">
                  Inventory
                </span>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {() => (
              <button
                className="duration-100 font-medium  text-red-400 text-left text-sm mt-2 hover:bg-red-400 rounded-md py-2 px-6 hover:text-white"
                onClick={disconnect}
              >
                Disconnect
              </button>
            )}
          </Menu.Item>
        </Base>
      ) : (
        <Base name="Connect Wallet">
          {wallets.map((wallet: any) => (
            <Menu.Item key={wallet.name}>
              {() => (
                <button
                  className="duration-100 text-left font-medium text-sm mt-2 hover:bg-white rounded-md py-2 px-6 hover:text-black text-white"
                  onClick={wallet.connect}
                >
                  {wallet.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Base>
      )}
    </>
  );
};

const Base = ({ name, children }: { name: any; children: ReactNode }) => {
  return (
    <>
      <Menu>
        <Menu.Button className="text-white text-xs lg:text-base bg-black/70 truncate border-2 border-white rounded-lg py-4 px-6 hover:bg-white hover:text-black duration-100 backdrop-blur-sm w-full lg:py-2 lg:w-48 lg:bg-inherit font-medium">
          {name}
        </Menu.Button>
        <Menu.Items className=" absolute w-full bg-black/70 lg:bg-inherit lg:w-48 border-white border-2 backdrop-blur-sm rounded-lg pb-2 px-2 flex flex-col mt-5">
          {children}
        </Menu.Items>
      </Menu>
    </>
  );
};

export default Dropdown;
