import mongoose from "mongoose";

const dataGroupSchema = mongoose.Schema({
  // fligts_ids: { type: Array },
  date: { type: String, require: true },
  id: { type: Array, require: true },
});

export default mongoose.model("FlightGroup", dataGroupSchema);
