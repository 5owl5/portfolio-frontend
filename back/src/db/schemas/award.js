import mongoose, { Schema, model } from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const awardSchema = new Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  number: {
    type: Number,
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

awardSchema.plugin(AutoIncrement, { inc_field: "number" });

const awardModel = model("Awards", awardSchema);

export { awardModel };
