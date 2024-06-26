import express from "express";
import {
  CREATE_FLIGHT_GROUPS,
  GET_ALL_FLIGHTS_GROUPS,
} from "../controllers/task_group.js";
const router = express.Router();

router.post("/group", CREATE_FLIGHT_GROUPS);
router.get("/group/:id", GET_ALL_FLIGHTS_GROUPS);
// TODO: add task group deleting endpoint

export default router;
