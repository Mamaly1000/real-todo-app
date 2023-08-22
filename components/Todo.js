import Image from "next/image";
import { useState } from "react";
import tickIcon from "./../assets/icons/tick.svg";
import editIcon from "./../assets/icons/edit.svg";
import deleteIcon from "./../assets/icons/delete.svg";
import axios from "axios";
const Todo = ({ todo, setTodos }) => {
  const [clicked, setCicked] = useState(false);
  const deleteToDo = (id) => {
    axios.delete(`/api/todos/${id}`).then((res) => {
      setTodos(res.data.todos);
      alert(res.data.message);
    });
  };
  return (
    <div className="min-w-[90%] min-h-[50px] rounded-lg border-white border-[1px] p-2 flex flex-wrap items-center justify-between gap-2 hover:border-violet-600   capitalize font-bold transition-all cursor-pointer">
      <span
        onClick={() => {
          setCicked((prev) => !prev);
        }}
        className="w-full sm:w-1/3 md:w-fit"
      >
        {todo.title}
      </span>
      <span
        onClick={() => {
          setCicked((prev) => !prev);
        }}
        className=" w-full sm:w-1/3 md:w-fit text-[.9rem] font-semibold "
      >
        created : {new Date(todo.created_at).toLocaleDateString()}
      </span>
      <div className="w-full sm:w-fit flex flex-wrap items-center justify-evenly gap-2 ">
        <button className="w-fit h-fit p-1 rounded-lg border-[1px] border-white hover:border-violet-600 transition-all">
          <Image src={tickIcon} width={25} height={25} alt="tick icon" />
        </button>{" "}
        <button className="w-fit h-fit p-1 rounded-lg border-[1px] border-white hover:border-violet-600 transition-all">
          <Image src={editIcon} width={25} height={25} alt="edit icon" />
        </button>{" "}
        <button
          onClick={() => deleteToDo(todo.id)}
          className="w-fit h-fit p-1 rounded-lg border-[1px] border-white hover:border-violet-600 transition-all"
        >
          <Image src={deleteIcon} width={25} height={25} alt="delete icon" />
        </button>
      </div>
      {clicked && (
        <div className="min-w-full min-h-[200px] max-h-[200px]">
          <p className="p-4 w-full min-h-[200px] rounded-lg border-[1px] border-white">
            {todo.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default Todo;
