import mongoose from "mongoose";
import dataGroupModel from "../models/task_group.js";

// =======================================================

// ==========================================================
const CREATE_FLIGHT_GROUPS = async (req, res) => {
  try {
    const group = new dataGroupModel({
      // id: req.body.id,
      title: req.body.title,
      date: req.body.date,
      flights_ids: [],
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
    const flights = await dataGroupModel
      .aggregate([
        {
          $lookup: {
            from: "flights",
            localField: "flights_ids",
            foreignField: "id",
            as: "flights",
          },
        },
        { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
      ])
      .exec();

    return res.json({ flights: flights });
  } catch (err) {
    console.log("handled error", err);
    return res.status(500).json({ message: "error happend" });
  }
};

export { CREATE_FLIGHT_GROUPS, GET_ALL_FLIGHTS_GROUPS };
