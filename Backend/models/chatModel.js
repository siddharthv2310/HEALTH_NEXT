import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    doctors: {
      type: Array,
      default: [],
    },

    doctor: {
      type: Object,
      default: null,
    },

    appointments: {
      type: Array,
      default: [],
    },

    suggestedAction: {
      type: Object,
      default: null,
    },
  },
  {
    _id: false,
  }
);

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },

    messages: {
      type: [messageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const chatModel =
  mongoose.models.chat ||
  mongoose.model("chat", chatSchema);

export default chatModel;