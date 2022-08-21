import express from "express";
import { escrowLookUpHandler, loginHandler, signupHandler } from "./src/routes/auth.js";
import { getArtworks, getMyArtworks } from "./src/routes/listings.js";

const router = express.Router();

router.post("/user_create", signupHandler)
router.post("/login", loginHandler)
router.post("/lookup_escrow", escrowLookUpHandler)

router.get("/all_artworks").get(getArtworks)
router.get("/my_artworks").get(getMyArtworks)
router.post("/new_artwork").get(getMyArtworks)

export default router;