import express from "express";
import { generateProof, getProofStats } from "../controllers/proofController";

const router = express.Router();

router.post("/generateProof", generateProof);
router.get("/stats", getProofStats);

export default router; 