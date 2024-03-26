import "dotenv/config";

import express from "express";
import cors from "cors";
import taskRouter from "./src/routes/task.js";

const app = express();
app.use(cors());
app.use(express.json());

// ===================po visu konfigutaciju panaudojame taskRouteri
app.use(taskRouter);

app.use((req, res) => {
  return res.status(404).json({ status: "Endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(`APP STARTED on PORT ${process.env.PORT}`);
});
