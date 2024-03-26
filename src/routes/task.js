import express from "express";
import {
  GET_TASK_BY_ID,
  CREATE_TASK,
  GET_ALL_TASKS,
  DELETE_TASK_BY_ID,
  UPDATE_TASK_BY_ID,
} from "../controllers/task.js";
const router = express.Router();

router.get("/tasks/:id", GET_TASK_BY_ID);
router.post("/tasks", CREATE_TASK);
router.get("/tasks", GET_ALL_TASKS);
router.delete("/tasks/:id", DELETE_TASK_BY_ID);
router.put("/tasks/:id", UPDATE_TASK_BY_ID);

// ===jei eksportuotume keleta dalyku, sintaxe butu {assas, asas, asas...}
// export { router };
// arba:
export default router;
