import { Schema, model } from "mongoose";

const awardSchema = new Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  awardNumber: {
    type: Number,
    required: true,
    default: 0,
  },
  awardWhere: {
    type: String,
    required: true,
  },
  awardName: {
    type: String,
    required: true,
  },
  awardDate: {
    type: Date,
    required: true,
  },
});

const awardModel = model("Awards", awardSchema);

export { awardModel };
