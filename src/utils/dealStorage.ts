// @ts-ignore
import contract from "../contracts/DealClient.json";
// ... other code
export const handleSubmit = async () => {
  const contractAddress = "0x0219eB1740C315fe5e20612D7E13AE2A883dB3f4"; // Deployed DealClient Contract address
  const contractABI = contract.abi; // the path where the DealClient.json is
  const commP = "baga6ea4seaqpi75umesad5vlyzyf66vbzntoave4bebmkcqu4f6nq6rchhx3ckq";
  // This handles proposing storage deals
  try {
    // @ts-ignore

    const { ethereum } = window;
    if (ethereum) {
      // @ts-ignore
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      // @ts-ignore
      dealClient = new ethers.Contract(contractAddress, contractABI, signer);

      // @ts-ignore
      let cid = new CID(commP);
      const extraParamsV1 = [
        "https://bafybeif74tokne4wvxsrcsxh6dhrzv6ys7mtifhwzaen7jfjuvltean32a.ipfs.w3s.link/ipfs/bafybeif74tokne4wvxsrcsxh6dhrzv6ys7mtifhwzaen7jfjuvltean32a/baga6ea4seaqesm5ghdwocotmdavlrrzssfl33xho6xtrr5grwyi5gj3vtairaoq.car", //carLink
        236445, // carSize
        false, // skipIpniAnnounce,
        false, // removeUnsealedCopy
      ];

      const DealRequestStruct = [
        cid.bytes, //cidHex
        8388608, //pieceSize,
        false, //verifiedDeal,
        commP, //label,
        520000, // startEpoch
        1555200, // endEpoch
        0, // storagePricePerEpoch,
        0, // providerCollateral,
        0, // clientCollateral,
        1, // extraParamsVersion,
        extraParamsV1,
      ];
      // @ts-ignore
      const transaction = await dealClient.makeDealProposal(DealRequestStruct);
      const receipt = await transaction.wait();
      console.log(receipt);
      // @ts-ignore
      dealClient.on("DealProposalCreate", (id, size, verified, price) => {
        console.log(id, size, verified, price);
      });

      console.log("Deal proposed! CID: " + cid);
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
    return;
  }
};
