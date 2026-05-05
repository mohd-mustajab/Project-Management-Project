const dns = require("dns");
const mongoose = require("mongoose");

// Force Node to use public DNS resolvers for MongoDB SRV lookups.
// This helps when the system resolver rejects SRV queries for Atlas clusters.
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("Missing MONGO_URI in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message || error);
    if (mongoUri.startsWith("mongodb+srv://")) {
      console.error(
        "SRV lookup failed. If your network blocks DNS SRV records, use a standard mongodb:// connection string from Atlas or a local MongoDB URI."
      );
    }
    process.exit(1);
  }
};

module.exports = connectDB;