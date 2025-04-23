import underdog from "@api/underdog";
import dotenv  from "dotenv";
import { createCollectionSchema, createNftParamSchema, getAllCollectionsSchema, projectIdSchema } from "./schemas";
import z from "zod";
import { uploadMediaOnIrys } from "./media-upload";
import { uploadMetada } from "./metadata-upload";
import {mintNft} from "./nft-mint"

dotenv.config();

type TCreateCollection = z.infer<typeof createCollectionSchema>
type TGetAllCollections = z.infer<typeof getAllCollectionsSchema>
type TcreateNftParam = z.infer<typeof createNftParamSchema >
type TProjectId = z.infer< typeof projectIdSchema >






/**
 * Underdog service
 *
 * This service is responsible for handling all requests to the NFT & NFT Collection miniting, creation and all.
 *
 * @class Underdog service
 * @version 1.0.0
 * @author praash
 */

export class Underdog {
  constructor(API_KEY: string) {
    underdog.auth(API_KEY);
  }

  async createCollection(data: TCreateCollection) {
    const { success } = createCollectionSchema.safeParse(data);
    if (!success) {
      return {
        success: false,
        message: "Error while validaing fields",
      };
    }
    try {
      const response = await underdog.postV2Projects(data);
      console.log(response.data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.warn(`Error While Creating a new Collection: ${error}`);
      throw error;
    }
  }

  async getAllCollections(data: TGetAllCollections) {
    const { success } = getAllCollectionsSchema.safeParse(data);

    if (!success) {
      return {
        success: false,
        message: "Error while validaing fields",
      };
    }
    try {
      const response = await underdog.getV2Projects({
        limit: data.limit,
        page: data.page,
      });
      console.log(response.data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(`Error while getting collections: ${error}`);
      throw error;
    }
  }

  async createNft (params: TcreateNftParam, projectId: TProjectId) {
    try {
      const response = await underdog.postV2ProjectsProjectidNfts(params, projectId);
      console.log(response.data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(`Error while getting collections: ${error}`);
      throw error;
    }

  }
}

// const UClient = new Underdog();

// (async () => {
//   const project = await UClient.getAllCollections({ page: 1, limit: 10 });
//   console.log(project.data);
// })();

// create collection schema example object
// {
//     name: 'Underdog NFT',
//     symbol: 'UPDG',
//     description: 'I minted this NFT with the Underdog API',
//     image: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
//     semifungible: true,
//     animationUrl: 'https://i.imgur.com/mGfz7Ig.mp4',
//     externalUrl: 'https://app.underdogprotocol.com',
//     attributes: {points: 10, name: 'LeBron'},
//     core: true,
//     sellerFeeBasisPoints: 100
//   }


// create Nft example params 
/*
{
  attributes: {
    points: 10,
    name: 'praash',
    song: 'ShutDown', // This will be allowed
  },
  receiver: {
    address: 'D9D2an4u2jo87VnvqkVabhfbg8N4tbfn5Yu488hYevb7',
    namespace: 'public',
    identifier: 'praash@example.com',
  },
  name: 'Praash NFT',
  symbol: 'pNFT',
  description: 'Praash minted this NFT with the Underdog API',
  image: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
  animationUrl: 'https://i.imgur.com/mGfz7Ig.mp4',
  externalUrl: 'https://app.underdogprotocol.com',
  delegated: true,
}

{
 projectId: 10 // number
}
*/

export { 
  uploadMediaOnIrys,
  uploadMetada,
  mintNft
};