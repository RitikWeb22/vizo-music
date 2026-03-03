const mongoose = require("mongoose");

const blacklistingSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required"],
      unique: [true, "Token must be unique"],
    },
  },
  { timestamps: true },
);

const blacklistingModel = mongoose.model("blacklisting", blacklistingSchema);

module.exports = blacklistingModel;
