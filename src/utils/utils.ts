"use server";

import { createWalletClient, http, parseEther, parseUnits } from "viem";
import { Main } from "./types";
import { base } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { USDCABI } from "../../contracts/consts";

export const bridgeToFil = async (
  amt: string,
  receiver: `0x${string}`,
  tokenType: "usdc" | "eth",
) => {
  const walletClient = createWalletClient({
    chain: base,
    transport: http("https://rpc.ankr.com/base"),
  });

  const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

  let headersList = {
    "x-integrator-id": process.env.INTREGRATOR_ID!,
  };

  if (tokenType === "usdc") {
    const hash = await walletClient.writeContract({
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      abi: USDCABI,
      functionName: "approve",
      account,
      args: ["0xce16f69375520ab01377ce7b88f5ba8c48f8d666", parseUnits(amt, 6).toString()],
    });

    if (!hash) {
      return;
    }
  }

  const sendingAmount = parseUnits(amt, tokenType === "usdc" ? 6 : 18).toString();
  const fromToken =
    tokenType === "eth"
      ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      : "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
  const toToken = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  const fromChain = "8453"; // Base
  const toChain = "314"; // Filecoin Mainnet

  let response = await fetch(
    `https://api.squidrouter.com/v1/route?fromChain=${fromChain}&fromToken=${fromToken}&fromAddress=${account.address}&fromAmount=${sendingAmount}&toChain=${toChain}&toToken=${toToken}&toAddress=${receiver}&quoteOnly=false&slippage=1.5&enableExpress=true`,
    {
      method: "GET",
      headers: headersList,
    },
  );

  const data = (await response.json()) as unknown as Main;

  const targetAddress = data.route.transactionRequest.targetAddress;
  const callData = data.route.transactionRequest.data;
  const value = data.route.transactionRequest.value;
  const gasLimit = data.route.transactionRequest.gasLimit;
  const gasPrice = data.route.transactionRequest.gasPrice;

  const tx = {
    from: account.address,
    to: targetAddress as `0x${string}`,
    data: callData as `0x${string}`,
    value: BigInt(value),
    gasLimit: gasLimit,
    gasPrice: BigInt(gasPrice),
  };

  console.log(tx);

  const txResponse = await walletClient.sendTransaction({
    to: tx.to,
    data: tx.data,
    value: tx.value,
    gasLimit: tx.gasLimit,
    gasPrice: tx.gasPrice,
    account,
  });

  console.log(txResponse);
};
