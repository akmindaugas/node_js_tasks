import dataGroupModel from "../models/task_group.js";

// =======================================================

// ==========================================================
const CREATE_FLIGHT_GROUPS = async (req, res) => {
  try {
    const group = new dataGroupModel({
      id: req.body.id,
      date: req.body.date,
      // fligts_ids: req.body.flights_ids,
    });

    const response = await group.save();

    return res
      .status(201)
      .json({ status: "Flight group was created", response: response });
  } catch (err) {
    console.log("handled error", err);
    return res.status(500).json({ message: "error happend" });
  }
};
// ==================================================================
const GET_ALL_FLIGHTS_GROUPS = async (req, res) => {
  try {
    // sita eilute veikia si find'u
    // const flights = await dataGroupModel.find();
    // pakeiciame find i aggregate
    const flights = await dataGroupModel
      .aggregate([
        {
          $lookup: {
            from: "flights",
            localField: "id",
            foreignField: "id",
            as: "flygg",
          },
        },
      ])
      .exec();

    return res.json({ flights: flights });
  } catch (err) {
    console.log("handled error", err);
    return res.status(500).json({ message: "error happend" });
  }
};

export { CREATE_FLIGHT_GROUPS, GET_ALL_FLIGHTS_GROUPS };
