import mongoose from "mongoose";
const instituteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    code: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      required: true,
      enum: ["educational", "commercial", "Scientific", "others"],
    },
    acronym: {
      type: String,
      required: true,
      maxlength: 20,
    },
    location: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/[\w.-]+(?:\.[\w.-]+)+[\w\-\._~:/?#[\]@!$&'()*+,;=.]+$/.test(
            v
          );
        },
        message: "Invalid website URL.",
      },
    },
    wikipedia: {
      type: String,
      default: null,
      validate: {
        validator: function (v) {
          if (!v) return true;
          return /^https?:\/\/[\w.-]+(?:\.[\w.-]+)+[\w\-\._~:/?#[\]@!$&'()*+,;=.]+$/.test(
            v
          );
        },
        message: "Invalid Wikipedia URL.",
      },
    },
    description: {
      type: String,
      maxlength: 1000,
      default: null,
    },
    logo: {
      type: String, // You typically store the file path or URL in MongoDB
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Institute", instituteSchema);
