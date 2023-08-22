import { todos } from "../../../data/todos";
export default function TodosHandler(req, res) {
  return res.status(200).json({
    todos,
  });
}
