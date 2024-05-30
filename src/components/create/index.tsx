"use client";

import { SetStateAction, useState } from "react";
import Input from "../form/input";
import Button from "../form/button";

export default function CreateGiftCard() {
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <main className="flex flex-col items-center justify-center gap-4 pt-36 pb-10">
      <div className="relative flex place-items-center before:absolute before:h-[50px] before:w-[180px] sm:before:h-[200px] md:before:w-[780px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[200px] sm:after:h-[180px] sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-teal-200 after:via-teal-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-teal-500 before:dark:opacity-10 after:dark:from-teal-400 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[260px] z-[-1]">
        <h1 className="text-4xl lg:text-5xl text-white mb-10">Create a Gift Card </h1>
      </div>
      <form className="flex flex-col space-y-6 w-[90%] md:max-w-[600px] mx-auto">
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
