import dotenv from "dotenv"
dotenv.config();

interface Config {
    wallet: number[];
  }
  
const config: Config = {
    wallet: JSON.parse(process.env.NEXT_PUBLIC_WALLET!)
};

if(!config.wallet){
    throw Error("Wallet env is not added");
}

console.log("Wallet -", config.wallet)

export default config.wallet;
