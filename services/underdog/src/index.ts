import underdog from "@api/underdog";
import dotenv  from "dotenv";
import { createCollectionSchema, getAllCollectionsSchema } from "./schemas";
import z from "zod";

dotenv.config();

type TCreateCollection = z.infer<typeof createCollectionSchema>
type TGetAllCollections = z.infer<typeof getAllCollectionsSchema>

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
