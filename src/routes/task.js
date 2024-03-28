import express from "express";
import {
  GET_FLIGHT_BY_ID,
  CREATE_FLIGHT,
  GET_ALL_FLIGHTS,
  DELETE_FLIGHT_BY_ID,
  UPDATE_FLIGHT_BY_ID,
} from "../controllers/task.js";
const router = express.Router();

router.get("/flights/:id", GET_FLIGHT_BY_ID);
router.post("/flights", CREATE_FLIGHT);
router.get("/flights", GET_ALL_FLIGHTS);
router.delete("/flights/:id", DELETE_FLIGHT_BY_ID);
router.put("/flights/:id", UPDATE_FLIGHT_BY_ID);

// ===jei eksportuotume keleta dalyku, sintaxe butu {assas, asas, asas...}
// export { router };
// arba:
export default router;
