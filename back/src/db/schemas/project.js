import mongoose, { Schema, model } from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ProjectSchema = new Schema({
  owner: {
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
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

ProjectSchema.plugin(AutoIncrement, {
  id: "project_counter",
  inc_field: "number",
});

const ProjectModel = model("Projects", ProjectSchema);

export { ProjectModel };
