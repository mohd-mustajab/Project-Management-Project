const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth header:", authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ msg: "No token" });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT verify error:", err.message);
    res.status(401).json({ msg: "Invalid token" });
  }
};