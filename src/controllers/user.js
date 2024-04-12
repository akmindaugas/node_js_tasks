import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";

const SIGN_UP = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const userData = {
      id: uuidv4(),
      full_name: req.body.full_name,
      email: req.body.email,
      password: hash,
      tasks: [],
    };

    const newUser = new UserModel(userData);
    const response = await newUser.save();

    return res.json({ tasks: response });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};

const LOG_IN = async (req, res) => {
  try {
    // tikriname, ar toks useris yra
    const user = await UserModel.findOne({ email: req.body.email });
    // jei tokio userio nera, graziname errora
    if (!user) {
      return res.status(404).json({ message: "user data is bad" });
    }
    // tikriname, ar userio passwordas geras? tikrinama sinchroniniu budu
    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(404).json({ message: "user data is bad" });
    }

    console.log(user);

    return res.json({ response: "ok" });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};

export { SIGN_UP, LOG_IN };
