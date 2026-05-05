require("dotenv").config();
console.log("JWT_SECRET loaded:", process.env.JWT_SECRET ? "Yes" : "No");
const app = require("./app");
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});