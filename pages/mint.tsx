import {
  ChainId,
  useNFTDrop,
  useContractMetadata,
  useClaimNFT,
  useActiveClaimCondition,
  useAddress,
  useMetamask,
  useUnclaimedNFTSupply,
  useClaimedNFTSupply,
  useNetworkMismatch,
  useNetwork,
} from "@thirdweb-dev/react";

import { NextPage } from "next";
import { useState } from "react";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import Image from "next/image";

const myNftDropContractAddress = "0x19669e577d052e97a33B02409092dF01aC8F02eD";

const Mint: NextPage = () => {
  const nftDrop = useNFTDrop(myNftDropContractAddress);
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const isOnWrongNetwork = useNetworkMismatch();
  const claimNFT = useClaimNFT(nftDrop);
  const [, switchNetwork] = useNetwork();

  // The amount the user claims
  const [quantity, setQuantity] = useState(1);

  // Load claimed supply and unclaimed supply
  const { data: unclaimedSupply } = useUnclaimedNFTSupply(nftDrop);
  const { data: claimedSupply } = useClaimedNFTSupply(nftDrop);

  // Load the active claim condition
  const { data: activeClaimCondition } = useActiveClaimCondition(nftDrop);

  // Check if there's NFTs left on the active claim phase
  const isNotReady =
    activeClaimCondition &&
    parseInt(activeClaimCondition?.availableSupply) === 0;

  // Check if there's any NFTs left
  const isSoldOut = unclaimedSupply?.toNumber() === 0;

  // Check price
  const price = parseUnits(
    activeClaimCondition?.currencyMetadata.displayValue || "0",
    activeClaimCondition?.currencyMetadata.decimals
  );

  // Multiply depending on quantity
  const priceToMint = price.mul(quantity);

  // Function to mint/claim an NFT
  const mint = async () => {
    if (isOnWrongNetwork) {
      switchNetwork && switchNetwork(ChainId.Mumbai);
      return;
    }
    claimNFT.mutate(
      { to: address as string, quantity },
      {
        onSuccess: () => {
          alert(`Successfully minted NFT${quantity > 1 ? "s" : ""}!`);
        },
        onError: (err: any) => {
          console.error(err);
          alert(err?.message || "Something went wrong");
        },
      }
    );
  };

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div
          className={`flex ${
            address && "flex-col space-y-3"
          } space-x-0  md:flex-row md:space-x-5 md:space-y-0 backdrop-blur-[2px] bg-white/10 rounded-lg p-3 md:p-5`}
        >
          {address ? (
            <>
              <div className="md:w-56 md:h-56 w-44 h-44  relative">
                <Image src="/nft.gif" alt="nft" layout="fill" className="rounded-lg" />
              </div>
              <div className="md:w-56 w-44 flex flex-col justify-between">
                <div className="rounded-lg md:text-lg text-sm flex justify-between font-medium text-white items-center">
                  <h4>Total Minted</h4>
                  {claimedSupply && unclaimedSupply ? (
                    <p>
                      <b>{claimedSupply?.toNumber()}</b>
                      {" / "}
                      {claimedSupply?.toNumber() + unclaimedSupply?.toNumber()}
                    </p>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                {isSoldOut ? (
                  <div className="bg-white rounded-lg p-2 flex justify-between mt-5 items-center font-medium">
                    <h4>Sold Out</h4>
                  </div>
                ) : isNotReady ? (
                  <div className="bg-white rounded-lg p-2 flex justify-between mt-5 items-center font-medium">
                    <h4>Not ready to be minted yet</h4>
                  </div>
                ) : (
                  <div>
                    <div className="bg-white rounded-lg p-2 flex justify-between mt-5 items-center">
                      <button
                        onClick={() => setQuantity((prev) => prev - 1)}
                        className="bg-black text-white font-semibold w-8 h-8 rounded-lg"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <h4 className="font-semibold">{quantity}</h4>
                      <button
                        onClick={() => setQuantity((prev) => prev + 1)}
                        className="bg-black text-white font-semibold w-8 h-8 rounded-lg"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={mint}
                      className="bg-black duration-100 hover:bg-[#7E24FA] text-white p-2 mt-3 md:mt-5 rounded-lg font-base w-full"
                    >
                      {claimNFT.isLoading
                        ? "Minting..."
                        : `Mint${quantity > 1 ? ` ${quantity}` : ""}${
                            activeClaimCondition?.price.eq(0)
                              ? " (Free)"
                              : activeClaimCondition?.currencyMetadata
                                  .displayValue
                              ? ` (${formatUnits(
                                  priceToMint,
                                  activeClaimCondition.currencyMetadata.decimals
                                )} ${
                                  activeClaimCondition?.currencyMetadata.symbol
                                })`
                              : ""
                          }`}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                className="bg-black basis-full hover:bg-[#7E24FA] duration-100 text-white py-2 px-4 rounded-lg font-base"
                onClick={connectWithMetamask}
              >
                Connect with Metamask
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Mint;
