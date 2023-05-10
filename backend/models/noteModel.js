import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please fill up the title"],
    },
    category: {
      type: String,
      required: [true, "Please fill up the category"],
    },
    content: {
      type: String,
      required: [true, "Please fill up the content"],
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
