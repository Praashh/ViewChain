import wallet from "../wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile, writeFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

export async function uploadMediaOnIrys(formData: FormData) {
    try {
      const assetFile = formData.get("asset");
  
      if (!assetFile) {
        throw new Error("No media file found in formData");
      }
  
      const file = assetFile as Blob;
      const buffer = Buffer.from(await file.arrayBuffer());
      const mimeType = file.type; // e.g., "video/mp4", "audio/mpeg", "image/png"
      const extension = mimeType.split("/")[1];
      const fileName = `assetFile.${extension}`;
  
      const umiMediaFile = createGenericFile(buffer, fileName, {
        tags: [{ name: "Content-Type", value: mimeType }],
      });
  
      const mediaUri = await umi.uploader.upload([umiMediaFile]);
      console.log("Your media URI:", mediaUri[0]);
      return mediaUri[0];
    } catch (error) {
      console.log("Oops.. Something went wrong", error);
    }
  }