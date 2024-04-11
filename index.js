import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import taskRouter from "./src/routes/task.js";
import taskGroupRouter from "./src/routes/task_group.js";
import userRouter from "./src/routes/user.js";

const app = express();
app.use(cors());
app.use(express.json());

// ===================po visu konfigutaciju panaudojame taskRouteri
app.use(taskRouter);
app.use(userRouter);
app.use(taskGroupRouter);

// PRIES endpointus BUTINAI:
mongoose
  // pirma procesinam prisijungimo duomenis is env:
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("connected to DB"));
// .catch((console.error("err", error))=>{console.log()});

app.use((req, res) => {
  return res.status(404).json({ status: "Endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(`APP ALIVE AND RUNNING ON PORT ${process.env.PORT}`);
});
