"use client";

import { useState } from "react";
import Card from "./card";
import Dialog from "../shared/dialog";
import { FiUpload } from "react-icons/fi";
import FileUpload from "../form/fileUpload";
import Button from "../form/button";

const giftCards = [
  {
    price: 25,
  },
  {
    price: 50,
  },
  {
    price: 100,
  },
  {
    price: 200,
  },
  {
    price: 500,
  },
  {
    price: 1000,
  },
];

export default function Discover() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  return (
    <main className="flex flex-col gap-5 pt-36 pb-20 md:pt-32 md:pb-6 px-10 md:px-24">
      <div className="flex items-center justify-center">
        <div className="relative flex place-items-center before:absolute before:h-[50px] before:w-[180px] sm:before:h-[200px] md:before:w-[780px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[200px] sm:after:h-[180px] sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-teal-200 after:via-teal-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-teal-500 before:dark:opacity-10 after:dark:from-teal-400 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[260px] z-[-1]">
          <h1 className="text-3xl lg:text-4xl text-white mb-8">Redeem Your Gift Cards 🎁</h1>
        </div>
      </div>
      {isLoading ? (
        <div className="flex flex-col mt-8 w-fit bg-[#141414] bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-xl shadow-md p-6">
          <div className="animate-pulse flex flex-col space-x-4">
            <div className="rounded-xl bg-neutral-700/80 h-48 w-[12rem]"></div>
            <div className="block h-4 mt-5 items-start bg-gray-400 rounded w-3/4"></div>
            <div className="flex flex-row justify-between mt-2">
              <div className="h-6 w-16 bg-gray-300/80 rounded"></div>
              <div className="h-8 w-20 bg-primary/50 rounded-lg"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-8">
          {giftCards.length === 0 ? (
            <p className="text-teal-400 text-lg">No gift cards found.</p>
          ) : (
            giftCards.map((data, index) => (
              <Card key={index} price={data.price} setIsEnabled={setIsEnabled} />
            ))
          )}
        </div>
      )}
      <Dialog isEnabled={isEnabled} setOutsideClick={setIsEnabled} setFile={setSelectedFile}>
        <div className="w-[40vw] flex flex-col p-5 gap-5 rounded-xl bg-[#1c1c1c] shadow-xl">
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
