import z from "zod";

 export const createCollectionSchema = z.object({
    name: z.string(),
    symbol: z.string(),
    description: z.string(),
    image: z.string(),
    semifungible: z.boolean(),
    animationUrl: z.string(),
    externalUrl: z.string(),
    attributes: z.object({
      points: z.number(),
      name: z.string(),
    }),
    core: z.boolean(),
    sellerFeeBasisPoints: z.number(),
  });

export const getAllCollectionsSchema = z.object({
    page: z.number(),
    limit: z.number(),
  });
