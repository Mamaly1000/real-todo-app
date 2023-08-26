import Todo from "./../../../server/models/todo";
import dbConnect from "../../../server/utils/dbConnect";
export default async function SingleToDoHandler(req, res) {
  await dbConnect();
  const {
    query: { todo_id },
    method,
  } = req;
  if (method === "DELETE") {
    await Todo.findByIdAndDelete(todo_id);
    const todos = await Todo.find({});
    return res.status(200).json({
      message: `todo has been deleted successfully !`,
      todos,
    });
  }
}
