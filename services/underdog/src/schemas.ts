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

export const nftAttributesSchema = z.object({
  points: z.number(),
  name: z.string(),
}); 

export const nftReceiverSchema = z.object({
  address: z.string().min(1),
  namespace: z.string(),
  identifier: z.string(),
});

export const createNftParamSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(2),
  symbol: z.string().min(1),
  image: z.string().url(), 
  animationUrl: z.string().url(),
  externalUrl: z.string().url(),
  attributes: nftAttributesSchema, 
  delegated: z.boolean(),
  receiver: nftReceiverSchema,
});

export const projectIdSchema = z.object({
  projectId: z.number(),
});

