"use server"
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import { findUp } from 'find-up';



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECREY,
});
export async function getWalletPrivateKey(AssetId: string){
    const wallet = await cloudinary.api
    .resources_by_asset_ids(AssetId);
    const walletJSON = await fetch(wallet.resources[0].secure_url);
    if (!walletJSON.ok) {
        throw new Error(`Failed to fetch JSON file: ${walletJSON.statusText}`);
      }
  
      // Parse the JSON content
      const jsonContent = await walletJSON.json();
  
      console.log("Wallet content:", jsonContent);

      try {
        const filePath = await findUp('services/underdog/wallet.json', {
          cwd: __dirname, // start searching from current directory
        });
        
        if (!filePath) {
          throw new Error('wallet.json not found in any parent directory');
        }
        const fileContent = await fs.promises.readFile(filePath, 'utf-8')

        if(fileContent.length <= 0){
          await fs.promises.writeFile(filePath, JSON.stringify(jsonContent), 'utf8');
          console.log("Wrote content, it was empty");
        }
        console.log("Local wallet file content:", jsonContent);
        return {
            success: true
        }
      } catch (localFileError) {
        console.warn("Could not write local wallet file:", localFileError);
        return {
            success: false
        }
      }
      return jsonContent;
  }