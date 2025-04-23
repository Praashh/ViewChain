import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount, PublicKey, Amount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import wallet from "../wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);
// Create the Collection NFT.
const collectionUpdateAuthority = generateSigner(umi);

interface TMintNft{
  name: string,
  symbol: string,
  uri: string,
  isCollection: boolean,
}
export async function mintNft (data: TMintNft) :Promise<{
    signature: any;
    mint: string
} | undefined> {
    const {name, isCollection, symbol, uri} = data;

    try {
        let tx = createNft(umi, {
            mint: mint,
            authority: collectionUpdateAuthority,
            name,
            symbol,
            uri,
            sellerFeeBasisPoints: percentAmount(2, 2), 
            isCollection,
        })
        let result = await tx.sendAndConfirm(umi);
        const signature = base58.encode(result.signature);
    
        console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)
    
        console.log("Mint Address: ", mint.publicKey);
        return {
            signature,
            mint:mint.publicKey
        }
    } catch (error) {
        console.log(`Error in minting ${error}`)
    }
};