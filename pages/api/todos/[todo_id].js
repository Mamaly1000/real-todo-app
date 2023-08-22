import { todos } from "../../../data/todos";

export default function SingleToDoHandler(req, res) {
  const { todo_id } = req.query;
  if (req.method === "DELETE") {
    const newArray = todos.findIndex((todo) => {
      return todo.id === parseInt(todo_id);
    });
    todos.splice(newArray, 1);
    return res.status(200).json({
      message: ` todo number ${todo_id} deleted successfuly !`,
      todos,
    });
  }
}
