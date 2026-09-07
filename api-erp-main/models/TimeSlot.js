const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamps");

const Schema = mongoose.Schema;

const timeSlotSchema = new Schema({
  faculty: {
    type: Schema.Types.ObjectId,
    ref: "faculty",
    required: true,
  },

  subject: {
    type: Schema.Types.ObjectId,
    ref: "subject",
    required: true,
  },

  session: {
    type: String,
    required: true,
    enum: ["lecture", "practical", "tutorial"],
  },

  day: {
    type: String,
    required: true,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },

  startTime: {
    type: String,
    required: true,
  },

  endTime: {
    type: String,
    required: true,
  },

  room: {
    type: String,
    required: true,
    trim: true,
  },

  isActive: {
    type: String,
    default: "active",
    enum: ["active", "inactive"],
  },

  createdAt: Date,
  updatedAt: Date,
});

timeSlotSchema.plugin(timestamps, { index: true });

module.exports = mongoose.model("timeSlot", timeSlotSchema);
