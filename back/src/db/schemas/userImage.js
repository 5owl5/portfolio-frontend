import { Schema, model } from "mongoose";

const ImageSchema = new Schema({
  owner: {
    type: String,
    ref: "User",
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

const ImageModel = model("UserImages", ImageSchema);

export { ImageModel };
