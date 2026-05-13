const mongoose = require('mongoose')


const attendenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    status: {
      type: String,
      enum: ["going", "intested"],
      default: "going",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendence", attendenceSchema)