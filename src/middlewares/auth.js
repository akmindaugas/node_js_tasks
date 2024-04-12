import jwt from "jsonwebtoken";

const authUser = (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "user is not authenticated" });
  }
  // decryptiname duomenis
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "user is not authenticated" });
    }

    req.body.userId = decoded.user_id;

    return next();
  });
};

export default authUser;
