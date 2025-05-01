import express, { Request, Response } from 'express';
import { ReclaimClient } from '@reclaimprotocol/zk-fetch';
import { transformForOnchain, verifyProof } from '@reclaimprotocol/js-sdk';
import dotenv from 'dotenv';
dotenv.config();

const reclaimClient = new ReclaimClient(process.env.APP_ID!, process.env.APP_SECRET!);
const app = express();


app.get('/', (_: Request, res: Response) => {
    res.send('gm gm! api is running');
});


app.get('/generateProof', async (_: Request, res: Response) => {
    try{
        // URL to fetch the data from
        const url = 'OUR_VIEW_COUNT_API';
        /* 
        * Fetch the data from the API and generate a proof for the response. 
        * The proof will contain the Views for a Asset. 
        */ 
        const proof = await reclaimClient.zkFetch(url, {
          // public options for the fetch request 
          method: 'GET',
        }, {
          // options for the proof generation
          responseMatches: [
            /* 
            * The proof will match the response body with the regex pattern (search for the views of asset in the response body 
            the regex will capture the views in the named group 'view').
            * to extract the views of Asset. (e.g. {"views":{"totalViews":3000}}) 
            */ 
            {
                "type": "regex",
                "value": 'views":{"totalViews":<view>}',
            }
          ],
          responseRedactions: [{
            regex: 'views":{"totalViews":<view>}'
          }]
        });
      
        if(!proof) {
          return res.status(400).send('Failed to generate proof');
        }
        // Verify the proof
        const isValid = await verifyProof(proof);
        if(!isValid) {
          return res.status(400).send('Proof is invalid');
        }
        // Transform the proof data to be used on-chain (for the contract)
         const proofData = await transformForOnchain(proof);
        return res.status(200).json({ transformedProof: proofData, proof });
    }
    catch(e){
        console.log(e);
        return res.status(500).send(e);
    }
})



const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});