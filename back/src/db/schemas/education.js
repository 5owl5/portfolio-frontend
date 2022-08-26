import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    owner: {
      type: String,
      required: true,
      ref: "user",
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
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);
export { EducationModel };
