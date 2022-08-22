import { Schema, model } from "mongoose";

const EducationSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  present: {
    type: String,
    required: true,
  },
});

const EducationModel = model("Education", EducationSchema);
export { EducationModel };
