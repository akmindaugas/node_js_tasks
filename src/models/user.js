import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String, require: true, min: 3 },
  full_name: { type: String, require: true, min: 3 },
  email: { type: String, require: true },
  password: { type: String, require: true },
  tasks: { type: Array },
});

export default mongoose.model("User", userSchema);
