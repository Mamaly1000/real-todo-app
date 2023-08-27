import React from "react";
import { getSingleTodo } from "../api/todos/[todo_id]";
import Todo from "./../../components/Todo";
const SingleTodoPage = ({ todo }) => {
  return (
    <div>
      <h1 className="font-bold">single Todo</h1>
      <div className="w-full flex justify-between items-center ">
        <span>title : {todo.title}</span>
      </div>
      <Todo todo={todo}  />
    </div>
  );
};

export default SingleTodoPage;

export const getServerSideProps = async ({ params }) => {
  const { todo_id } = params;
  const todo = await getSingleTodo(todo_id);
  return {
    props: {
      todo: JSON.parse(JSON.stringify(todo)),
    },
  };
};
