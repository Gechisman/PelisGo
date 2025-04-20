import { Router } from "express";
import { authenticate, registerUser } from "../controllers/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/authenticate", authenticate);

export default router;