import { todos } from "../../../data/todos";
export default function TodosHandler(req, res) {
  if (req.method === "POST") {
    const newTodo = req.body;
    todos.push(newTodo);
    return res.status(201).json({
      todos,
      message: `todo ${req.body.title} added successfully !`,
    });
  }
  if (req.method === "GET") {
    return res.status(200).json({
      todos,
    });
  }
}
