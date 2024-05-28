"use client";

import { SetStateAction, useState } from "react";
import Input from "../form/input";
import Button from "../form/button";
import Image from "next/image";
import Upload from "../form/upload";

export default function CreateGiftCard() {
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [file, setFile] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadFile = async (file: any) => {
    const image = URL.createObjectURL(file);
    setFile(image);
    setIsLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center gap-4 pt-36 pb-10">
      <form className="flex flex-col space-y-5 w-[90%] md:max-w-[600px] mx-auto">
        <Image
          className="mx-auto w-[14rem] h-[14rem] bg-gradient-to-tr from-[#d4d3ff] to-sky-400 rounded-lg object-fill"
          src={file !== "" ? file : "/preview.png"}
          alt="preview"
          width={200}
          height={200}
        />
        <Upload
          id="image"
          name="image"
          type="file"
          label="Upload File"
          onChange={(e) => {
            setIsLoading(true);
            uploadFile(e.target.files[0]);
          }}
        />
        <Input
          id="recipient"
          name="recipient"
          label="Receiver address"
          placeholder="0x34rc...kkr5"
          type="text"
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setRecipient(e.target.value)
          }
          helper="This recipient will receive you storage deal gift"
        />
        <Input
          id="amount"
          name="amount"
          label="Amount (ETH)"
          placeholder="0.02 ETH"
          type="number"
          onChange={(e: { target: { value: SetStateAction<number> } }) => setAmount(e.target.value)}
          helper="Your gift card will be worth this amount"
        />
        <Button
          id="create"
          title="Gift this card"
          onClick={() => console.log("Create gift card")}
          disabled={isLoading}
        />
      </form>
    </main>
  );
}
