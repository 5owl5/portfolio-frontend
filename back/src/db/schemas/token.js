import { Schema, model } from "mongoose";

const TokenSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TokenModel = model("Token", TokenSchema);

export { TokenModel };
