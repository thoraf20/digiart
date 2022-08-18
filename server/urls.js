import express from "express";
import { escrowLookUpHandler, loginHandler, signupHandler } from "./src/routes/auth.js";

const router = express.Router();

router.post("/user_create", signupHandler)

router.post("/login", loginHandler)

router.post("/lookup_escrow", escrowLookUpHandler)


export default router;