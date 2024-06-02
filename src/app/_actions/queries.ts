"use server";

import { client } from "@/utils/supabase/client";

export const getClaims = async (address: string) => {
  const { data } = await client.from("giftWrap").select("*").eq("address", address);
  return data;
};

export const setClaim = async (createdBy: string, amount: number, cid: string, address: string) => {
  const response = await client.from("giftWrap").insert({
    createdBy,
    amount,
    cid,
    address,
  });
  return response;
};
