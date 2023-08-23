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
});

export default  models.Todo || model("Todo", todoschema);
