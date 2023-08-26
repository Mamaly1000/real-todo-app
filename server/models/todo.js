import { Schema, model, models } from "mongoose";

const todoschema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
    default: Date.now().toLocaleString(),
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  category: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
    default: 5,
  },
  deadline: {
    type: Date,
    required: true,
    default: (Date.now() + 10000000).toLocaleString(),
  },
});

export default models.Todo || model("Todo", todoschema);
