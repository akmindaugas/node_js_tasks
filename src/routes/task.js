import express from "express";
import {
  GET_FLIGHT_BY_ID,
  CREATE_FLIGHT,
  GET_ALL_FLIGHTS,
  DELETE_FLIGHT_BY_ID,
  UPDATE_FLIGHT_BY_ID,
} from "../controllers/task.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

// i koki endpointa kreipiesi / kokia funkcija bus aktyvuota
router.get("/flights/:id", auth, GET_FLIGHT_BY_ID);
router.post("/flights/:groupId", auth, CREATE_FLIGHT);
router.get("/flights", auth, GET_ALL_FLIGHTS);
router.delete("/flights/:id", auth, DELETE_FLIGHT_BY_ID);
router.put("/flights/:id", auth, UPDATE_FLIGHT_BY_ID);

// ===jei eksportuotume keleta dalyku, sintaxe butu {assas, asas, asas...}
// export { router };
// arba:
export default router;
