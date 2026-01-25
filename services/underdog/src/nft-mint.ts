import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createSignerFromKeypair,
  signerIdentity,
  generateSigner,
  percentAmount,
  PublicKey,
  Amount,
} from "@metaplex-foundation/umi";
import {
  createNft,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let myKeypairSigner: ReturnType<typeof createSignerFromKeypair> | null = null;

function getSigner() {
  if (!myKeypairSigner) {
    // Lazy load wallet at runtime, not during build
    const wallet = require("../wallet.json");
    const walletArray = Array.isArray(wallet) ? wallet : wallet.default || wallet;
    const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(walletArray));
    myKeypairSigner = createSignerFromKeypair(umi, keypair);
    umi.use(signerIdentity(myKeypairSigner));
    umi.use(mplTokenMetadata());
  }
  return myKeypairSigner;
}

const mint = generateSigner(umi);
// Create the Collection NFT.
const collectionUpdateAuthority = generateSigner(umi);

interface TMintNft {
  name: string;
  symbol: string;
  uri: string;
  isCollection: boolean;
}
export async function mintNft(data: TMintNft): Promise<
  | {
      signature: any;
      mint: string;
    }
  | undefined
> {
  const { name, isCollection, symbol, uri } = data;

  try {
    getSigner(); // Ensure signer is initialized
    let tx = createNft(umi, {
      mint: mint,
      authority: collectionUpdateAuthority,
      name,
      symbol,
      uri,
      sellerFeeBasisPoints: percentAmount(2, 2),
      isCollection,
    });
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);

    console.log(
      `Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
    );

    console.log("Mint Address: ", mint.publicKey);
    return {
      signature,
      mint: mint.publicKey,
    };
  } catch (error) {
    console.log(`Error in minting ${error}`);
  }
}
