import Todo from "./../../../server/models/todo";
export default async function TodosHandler(req, res) {
  if (req.method === "POST") {
    return res.status(201).json({
      message: `todo ${req.body.title} added successfully !`,
    });
  } else if (req.method === "GET") {
    const todos = await Todo.find({}, null, {
      maxTimeMS: 30000,
    });
    return res.status(200).json({
      todos,
    });
  }
}
