import userModel from "../models/user.js";

// =======================================================

// ==========================================================
const SIGN_UP = async (req, res) => {
  try {
    console.log(req.body);

    return res.json({ user: "user console" });
  } catch (err) {
    console.log("handled error", err);
    return res.status(500).json({ message: "error happend" });
  }
};
// ==================================================================

export { SIGN_UP };
