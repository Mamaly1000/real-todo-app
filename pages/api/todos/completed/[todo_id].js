import dbConnect from "../../../../server/utils/dbConnect";
import Todo from "../../../../server/models/todo";

export default async function TodosCompleteHandler(req, res) {
  await dbConnect();
  const {
    method,
    body,
    query: { todo_id },
  } = req;
  if (method === "PUT") {
    const todo = await Todo.findById(todo_id);
    todo.completed = !todo.completed;
    await todo.save();
    const todos = await Todo.find({});
    return res.status(200).json({
      todos,
    });
  }
}
