import wallet from "../wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

interface TUploadMedata {
    name: string
    description: string
    symbol: string
    image: string | undefined
    attributes: Array<{
        views: number,
        asset_url: string | undefined,
        category: string
    }>,
    properties: {
        files: Array<{
            type: string,
            uri: string | undefined
        }>
    },
    creators: Array<{
        address: string,
        creator: string
    }>
}

export async function uploadMetada(metadata: TUploadMedata) {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure
        const umiJSOnFile = createGenericFile(JSON.stringify(metadata), "praash-mint-metadata", {
            tags: [{ name: "Content-Type", value: "JSON" }],
        });

        const Uri = await umi.uploader.upload([umiJSOnFile]).catch((err) => {
            throw new Error(err);
        });
        console.log("Your image URI: ", Uri);
        return Uri
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
};