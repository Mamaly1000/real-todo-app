import Todo from "./../../../server/models/todo";
import dbConnect from "../../../server/utils/dbConnect";
import moment from "moment";
export default async function SingleToDoHandler(req, res) {
  await dbConnect();
  const {
    query: { todo_id },
    method,
    body,
  } = req;
  if (method === "DELETE") {
    await Todo.findByIdAndDelete(todo_id);
    const todos = await Todo.find({});
    return res.status(200).json({
      message: `todo has been deleted successfully !`,
      todos,
    });
  } else if (method === "GET") {
    const todo = await getSingleTodo(todo_id);
    return res.status(200).json({
      todo,
      message: "todo loaded successfully !",
    });
  } else if (method === "PUT") {
    const todo = await Todo.findById(todo_id);
    todo.title = body.title;
    todo.description = body.description;
    todo.priority = body.priority;
    todo.selected_time = body.selected_time;
    todo.deadline = new Date(moment(body.deadline).format("YYYY/MM/DD"));
    todo.category = body.category;
    todo.completed = body.completed;
    await todo.save();
    return res.status(200).json({
      message: "todo updated successfully !",
    });
  }
}

export const getSingleTodo = async (query) => {
  const todo = await Todo.findById(query);
  return todo;
};
