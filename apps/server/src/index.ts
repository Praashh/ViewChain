import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import proofRoutes from "./routes/proofRoutes";
import { initProofStatsCron } from "./cron/proofStatsCron";


dotenv.config();

// Log environment variables for debugging
console.log("CLIENT_APP_URL:", process.env.CLIENT_APP_URL);
console.log("PORT:", process.env.PORT);


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (_: Request, res: Response) => {
  res.send("gm gm! api is running");
});

app.use("/api", proofRoutes);

app.get("/health", (_: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
  });
});

// TODO: remove this once we have changed the routes on client currently using this to test the server

app.post("/generateProof", (req: Request, res: Response) => {
  req.url = "/api/generateProof";
  app._router.handle(req, res);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  

  initProofStatsCron();
});
