import dbConnect from "../../../server/utils/dbConnect";
import Todo from "./../../../server/models/todo";

export default async function TodosHandler(req, res) {
  const { method, body } = req;
  await dbConnect();
  if (method === "POST") {
    await Todo.create({
      title: body.title,
      description: body.description,
      created_at: String(Date.now()),
      completed: false,
      category: body.category,
    });
    const todos = await Todo.find({});
    return res.status(201).json({
      message: `todo ${body.title} added successfully !`,
      todos,
    });
  } else if (method === "GET") {
    const todos = await Todo.find({});
    return res.status(200).json({ todos });
  }
}
