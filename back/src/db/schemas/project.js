import { Schema, model } from "mongoose";

const projectSchema = new Schema({
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
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  startpoint: {
    type: Date,
    required: true,
  },
  endpoint: {
    type: Date,
    required: true,
  },
});

const projectModel = model("Projects", projectSchema);

export { projectModel };
