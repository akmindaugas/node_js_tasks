import express from "express";
import { SIGN_UP, LOG_IN } from "../controllers/user.js";
const router = express.Router();

// i koki endpointa kreipiesi / kokia funkcija bus aktyvuota

router.post("/users", SIGN_UP);
router.post("/users/login", LOG_IN);

// ===jei eksportuotume keleta dalyku, sintaxe butu {assas, asas, asas...}
// export { router };
// arba:
export default router;
