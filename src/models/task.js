import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
  id: { type: String, require: true, min: 3 },
  price: { type: Number, require: true },
  departureCity: { type: String, require: true, min: 3 },
  destinationCity: { type: String, require: true, min: 3 },
  destinationCityPhotoUrl: { type: String, require: true, min: 6 },
  departureTime: { type: String, require: true, min: 2 },
});

export default mongoose.model("Flight", dataSchema);
