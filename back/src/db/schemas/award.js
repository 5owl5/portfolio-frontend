import mongoose, { Schema, model } from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const AwardSchema = new Schema({
  owner: {
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
  prize: {
    type: String,
    required: true,
  },
  awardedAt: {
    type: Date,
    required: true,
  },
});

AwardSchema.plugin(AutoIncrement, { id: "award_counter", inc_field: "number" });

const AwardModel = model("Awards", AwardSchema);

export { AwardModel };
