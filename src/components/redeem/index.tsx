"use client";

import { useEffect, useState } from "react";
import Card from "./card";
import Dialog from "../shared/dialog";
import { FiUpload } from "react-icons/fi";
import FileUpload from "../form/fileUpload";
import Button from "../form/button";
import { useAccount, useReadContract } from "wagmi";
import { abi, baseSepoliaAddress, publicClient } from "../../../contracts/consts";
import lighthouse from "@lighthouse-web3/sdk";

interface IGcInfo {
  tokenId: number;
  amount: number;
  isETH: boolean;
  isRedeemable: boolean;
  createdBy: `0x${string}`;
  receipient: `0x${string}`;
}

export default function Discover() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [GCs, setGCs] = useState<number[]>([]);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [GCsInfo, setGCsInfo] = useState<IGcInfo[]>([]);
  const { address } = useAccount();

  const { data: NFTIds } = useReadContract({
    address: baseSepoliaAddress,
    abi: abi,
    functionName: "getUserGiftCards",
    args: [address],
  });

  const getGCAmount = async (id: number): Promise<IGcInfo> => {
    const data = (await publicClient.readContract({
      address: baseSepoliaAddress,
      abi: abi,
      functionName: "_giftCardInfo",
      args: [id],
    })) as [number, number, boolean, boolean, `0x${string}`, `0x${string}`];
    return {
      tokenId: data[0],
      amount: data[1],
      isETH: data[2],
      isRedeemable: data[3],
      createdBy: data[4],
      receipient: data[5],
    } as IGcInfo;
  };

  const getETHPrice = async () => {
    const response = await fetch("https://rest.coinapi.io/v1/exchangerate/ETH/USD", {
      headers: {
        "X-CoinAPI-Key": process.env.NEXT_PUBLIC_API_KEY as string,
      },
    });

    const data = await response.json();
    return data.rate as number;
  };

  useEffect(() => {
    setIsLoading(true);
    console.log("NFTIds", NFTIds);
    const getGCs = async () => {
      const price = await getETHPrice();
      (NFTIds as number[]).forEach(async (id: number) => {
        const gcInfo = await getGCAmount(id);
        setGCsInfo((prev) => [...prev, gcInfo]);
        const amt = gcInfo.isETH
          ? Number(gcInfo.amount) / 10 ** 18
          : Number(gcInfo.amount) / 10 ** 6;
        setGCs((prev) => [...prev, gcInfo.isETH ? Number((amt * price).toPrecision(2)) : amt]);
      });
      setIsLoading(false);
    };
    if (NFTIds) {
      getGCs();
    }
  }, [NFTIds]);

  return (
    <main className="flex flex-col gap-5 pt-36 pb-20 md:pt-32 md:pb-6 px-10 md:px-24">
      <div className="flex items-center justify-center">
        <div className="relative flex place-items-center before:absolute before:h-[50px] before:w-[180px] sm:before:h-[200px] md:before:w-[780px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[200px] sm:after:h-[180px] sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-teal-200 after:via-teal-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-teal-500 before:dark:opacity-10 after:dark:from-teal-400 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[260px] z-[-1]">
          <h1 className="text-3xl lg:text-4xl text-white mb-8">Redeem Your Gift Cards 🎁</h1>
        </div>
      </div>
      {isLoading ? (
        <div className="flex flex-col mt-8 w-fit bg-[#141414] bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-xl shadow-md p-6">
          <div className="animate-pulse flex flex-col">
            <div className="rounded-xl bg-gradient-to-br from-indigo-400 via-amber-400 to-sky-400 w-[15rem] h-[5rem]"></div>
            <div className="flex flex-row justify-between items-center mt-3">
              <div className="h-6 w-20 bg-neutral-200/80 rounded"></div>
              <div className="h-8 w-28 bg-blue-400 rounded-lg"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-8">
          {GCs?.length === 0 ? (
            <p className="text-teal-400 text-lg">No gift cards found.</p>
          ) : (
            GCs?.map(
              (data, index) =>
                GCsInfo[index].isRedeemable && (
                  <Card
                    key={index}
                    tokenId={GCsInfo[index].tokenId}
                    price={data}
                    setIsEnabled={setIsEnabled}
                    type={GCsInfo[index].isETH ? "eth" : "usdc"}
                  />
                ),
            )
          )}
        </div>
      )}
      <Dialog isEnabled={isEnabled} setOutsideClick={setIsEnabled} setFile={setSelectedFile}>
        <div className="w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] flex flex-col p-5 gap-5 rounded-xl bg-[#1c1c1c] shadow-xl">
          <span className="flex flex-row gap-2 items-center text-neutral-300 text-xl font-medium">
            Upload your files <FiUpload />
          </span>
          <FileUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
          <Button
            id="upload"
            title="Redeem storage deal"
            onClick={() => console.log("Upload file")}
            disabled={!selectedFile}
          />
        </div>
      </Dialog>
    </main>
  );
}
