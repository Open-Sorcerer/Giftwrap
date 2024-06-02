/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console -- This is a top level component */
import React, { useState } from "react";
import Preview from "./preview";
import lighthouse from "@lighthouse-web3/sdk";
import { setClaim } from "@/app/_actions/queries";
import { IDb } from "@/utils/types";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import Link from "next/link";
import { getETHPrice } from "@/utils";

interface FileUploadProps {
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  db: IDb;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

function FileUpload({
  selectedFile,
  setSelectedFile,
  db,
  setRefetch,
}: FileUploadProps): React.ReactElement {
  const [_isDragging, setIsDragging] = useState<boolean>(false);
  const [isDragHover, setIsDragHover] = useState<boolean>(false);
  const [cid, setCid] = useState<string>();
  const { address } = useAccount();

  const handleDragEnter = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsDragging(false);
    setIsDragHover(false);
  };

  const handleDragOver = (e: React.DragEvent): void => {
    setIsDragHover(true);
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent): void => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
    setIsDragHover(false);
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const file: File = e.target.files[0];
    setSelectedFile(file);

    const output = await lighthouse.upload(e.target.files, process.env.NEXT_PUBLIC_LH_API_KEY!);
    const createdBy = db.createdBy;
    const price = await getETHPrice();
    // const amount = {db.type === "usdc" ? (db.amount/5.8).toPrecision(2) : ((db.amount * price)/5.8).toPrecision(2)}
    const amount = 0;
    const cid = `https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`;
    const response = await setClaim(createdBy, amount, cid, address as string);
    if (response.status === 201) toast.success("Uploaded Successfully!");
    setRefetch((prev) => !prev);
    setCid(`https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`);
  };

  const handleButtonClick = (): void => {
    if (typeof document !== "undefined") {
      document.getElementById("input-file-upload")?.click();
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <button
        className="text-textColor flex min-h-[7rem] cursor-pointer flex-col items-center gap-y-2 rounded-[.625rem] border border-neutral-600 bg-neutral-800 px-6 py-2 tracking-wide shadow-lg"
        onClick={handleButtonClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        type="button"
      >
        {selectedFile !== null ? (
          <div className="grid items-center">
            <div className="flex items-center justify-center gap-3">
              <Preview content={selectedFile} />
              <span className="mt-2 w-[15vw] truncate text-center text-base font-semibold leading-normal">
                {selectedFile.name}
              </span>
            </div>
            <span className="mt-2 text-center text-xs">
              Drag & Drop or upload the file Manually to change the logo
            </span>
          </div>
        ) : (
          <>
            <svg
              fill="none"
              height="35"
              viewBox="0 0 24 24"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z"
                fill="#F1F5F9"
                opacity="0.4"
              />
              <path
                d="M15.8 2.20999C15.39 1.79999 14.68 2.07999 14.68 2.64999V6.13999C14.68 7.59999 15.92 8.80999 17.43 8.80999C18.38 8.81999 19.7 8.81999 20.83 8.81999C21.4 8.81999 21.7 8.14999 21.3 7.74999C19.86 6.29999 17.28 3.68999 15.8 2.20999Z"
                fill="#F1F5F9"
              />
              <path
                d="M11.53 12.47L9.53 10.47C9.52 10.46 9.51 10.46 9.51 10.45C9.45 10.39 9.37 10.34 9.29 10.3C9.28 10.3 9.28 10.3 9.27 10.3C9.19 10.27 9.11 10.26 9.03 10.25C9 10.25 8.98 10.25 8.95 10.25C8.89 10.25 8.82 10.27 8.76 10.29C8.73 10.3 8.71 10.31 8.69 10.32C8.61 10.36 8.53 10.4 8.47 10.47L6.47 12.47C6.18 12.76 6.18 13.24 6.47 13.53C6.76 13.82 7.24 13.82 7.53 13.53L8.25 12.81V17C8.25 17.41 8.59 17.75 9 17.75C9.41 17.75 9.75 17.41 9.75 17V12.81L10.47 13.53C10.62 13.68 10.81 13.75 11 13.75C11.19 13.75 11.38 13.68 11.53 13.53C11.82 13.24 11.82 12.76 11.53 12.47Z"
                fill="#F1F5F9"
              />
            </svg>
            {isDragHover ? (
              <span className="mt-2 text-center text-base font-semibold leading-normal">
                Drop Your File Here
              </span>
            ) : (
              <span className="mt-2 text-center text-xs font-semibold leading-normal">
                Upload Your Logo <br /> (Drag & Drop or upload the file Manually) <br />
                {selectedFile !== null}
              </span>
            )}

            <input
              className="hidden"
              id="input-file-upload"
              onChange={handleFileInputChange}
              type="file"
            />
          </>
        )}
      </button>
      {cid && (
        <Link href={cid} target="_blank" className="w-full text-cyan-400 truncate">
          {cid}
        </Link>
      )}
    </div>
  );
}

export default FileUpload;
