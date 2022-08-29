import mongoose, { Schema, model } from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const projectSchema = new Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  number: {
    type: Number,
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

projectSchema.plugin(AutoIncrement, {
  id: "project_counter",
  inc_field: "number",
});

const projectModel = model("Projects", projectSchema);

export { projectModel };
