import { getSession } from "next-auth/react";
import dbConnect from "../../../server/utils/dbConnect";
import Todo from "./../../../server/models/todo";

export default async function TodosHandler(req, res) {
  await dbConnect();
  const session = await getSession({ req });
  const { method, body } = req;
  if (method === "POST") {
    await Todo.create({
      title: body.title,
      description: body.description,
      created_at: String(Date.now()),
      completed: false,
      category: body.category,
      priority: body.priority,
      deadline: new Date(body.deadLine),
      selected_time: body.selected_time + "",
      userID: body.userID,
    });
    const todos = await Todo.find({ userID: body.userID });
    return res.status(201).json({
      message: `todo ${body.title} added successfully !`,
      todos,
    });
  } else if (method === "GET") {
    const todos = await getAllTodos(session.user.id);
    return res.status(200).json({
      todos,
      message: `here are your list of todos ${session.user.name}`,
    });
  }
}

export const getAllTodos = async (id) => {
  const todos = await Todo.find({ userID: id });
  return todos;
};
