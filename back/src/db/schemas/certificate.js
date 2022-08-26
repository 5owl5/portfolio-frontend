import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
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
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    acquisitionDate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
