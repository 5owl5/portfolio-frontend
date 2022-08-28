import { Schema, model } from "mongoose";

const awardSchema = new Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  number: {
    type: Number,
    required: true,
    default: 0,
  },
  host: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  awardedAt: {
    type: Date,
    required: true,
  },
});

const awardModel = model("Awards", awardSchema);

export { awardModel };
