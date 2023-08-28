import Image from "next/image";
import { useState } from "react";
import tickIcon from "./../assets/icons/tick.svg";
import editIcon from "./../assets/icons/edit.svg";
import deleteIcon from "./../assets/icons/delete.svg";
import axios from "axios";
import Error from "next/error";
import { priorities } from "./TodoForm";
import priorityIcon from "./../assets/icons/priority.svg";
import infoIcon from "./../assets/icons/todo-detail.svg";
import clickIcon from "../assets/icons/clock.svg";
import moment from "moment/moment";
import Link from "next/link";
const TodoComponent = ({ todo, setTodos }) => {
  const [clicked, setCicked] = useState(false);
  const deleteToDo = (id) => {
    axios
      .delete(`/api/todos/${id}`)
      .then((res) => {
        setTodos(res.data.todos);
        alert(res.data.message);
      })
      .catch((err) => {
        throw new Error({ title: err });
      });
  };
  return (
    <div className="min-w-[90%] min-h-[50px] md:min-w-[330px] max-w-[330px] rounded-lg flex flex-col items-start overflow-hidden capitalize font-bold transition-all  ">
      <div
        className="w-full min-h-[30px] rounded-t-lg p-2 text-[.9rem] font-semibold  flex justify-between items-center "
        style={{ background: priorities[todo.priority - 1].color }}
      >
        <div className="flex justify-start items-center gap-2">
          <Image
            className="w-[20px] h-[20px] "
            alt="priority icon"
            src={priorityIcon}
          />
          Priority task {todo.priority}
        </div>
        <button
          onClick={() => setCicked((prev) => !prev)}
          className="w-fit h-fit rounded-full p-2 bg-btn_color"
        >
          <Image alt="info" src={infoIcon} className="w-[20px] h-[20px] " />
        </button>
      </div>
      <div className="w-full min-w-[150px] p-2 flex flex-wrap items-start justify-start gap-2 bg-modal_container">
        <div className=" w-full py-2 flex justify-start items-center gap-2 border-b-[1px] border-modal_copyright">
          <div
            className="w-[20px] h-[20px] rounded-full flex justify-center items-center"
            style={{ background: priorities[todo.priority - 1].color }}
          >
            <div className="w-[17px] h-[17px] rounded-full flex justify-center items-center bg-modal_container">
              <div
                className="w-[5px] h-[5px] rounded-full flex justify-center items-center"
                style={{ background: priorities[todo.priority - 1].color }}
              ></div>
            </div>
          </div>
          <span
            onClick={() => {
              setCicked((prev) => !prev);
            }}
            className=" line-clamp-1 w-full sm:w-1/3 md:w-fit"
          >
            {todo.title}
          </span>
        </div>
        <div className="w-full py-2 flex gap-2 items-center justify-between ">
          <span
            onClick={() => {
              setCicked((prev) => !prev);
            }}
            className=" w-fit flex items-center gap-2 text-[.9rem] font-semibold "
          >
            <Image
              className="w-[20px] h-[20px]"
              src={clickIcon}
              alt="clock icon"
            />
            {+(todo.selected_time + "").split(":")[0] > 12
              ? todo.selected_time + " PM"
              : todo.selected_time + " AM"}
          </span>
          <span
            onClick={() => {
              setCicked((prev) => !prev);
            }}
            className=" w-fit rounded-lg px-2 py-1 border-[1px] border-btn_color "
          >
            {todo.category}
          </span>
          <span
            onClick={() => {
              setCicked((prev) => !prev);
            }}
            className="w-fit whitespace-nowrap text-[.9rem] font-semibold "
          >
            {moment(todo.deadline).format("dddd, DD MMM YYYY")}
          </span>
        </div>

        {clicked && (
          <div className="min-w-full border-t-[1px] pt-2 border-modal_copyright min-h-[200px] max-h-fit flex flex-col gap-2 justify-center items-center">
            <span className="w-full text-start">title :</span>
            <p className="p-4 w-full min-h-fit capitalize max-h-[fit] rounded-lg border-[1px] border-white">
              {todo.title}
            </p>
            <span className="w-full text-start">description :</span>
            <p className="p-4 w-full min-h-[200px] capitalize max-h-[fit] rounded-lg border-[1px] border-white">
              {todo.description}
            </p>
            <div className="w-full flex flex-wrap items-center justify-start gap-2 ">
              <Link legacyBehavior href={`/todos/${todo._id}`}>
                <a className="capitalize flex items-center gap-2 w-fit h-fit px-2 py-1 rounded-lg border-[1px] border-white hover:border-btn_color transition-all bg-yellow-600">
                  <Image
                    src={editIcon}
                    width={25}
                    height={25}
                    alt="edit icon"
                  />
                  edit{" "}
                </a>
              </Link>
              <button
                onClick={() => deleteToDo(todo._id)}
                className="flex items-center gap-2   w-fit h-fit px-2 py-1 rounded-lg border-[1px] border-white hover:border-btn_color transition-all capitalize bg-red-700"
              >
                <Image
                  src={deleteIcon}
                  width={25}
                  height={25}
                  alt="delete icon"
                />
                delete
              </button>
              <button className="w-fit h-fit rounded-lg  border-[1px] border-btn_color hover:border-white transition-all bg-btn_color capitalize flex items-center gap-2 px-2 py-1">
                <Image src={tickIcon} alt="tick icon" />
                done!
              </button>
              <span className="w-fit h-fit rounded-lg  border-[1px] border-btn_color px-2 py-1 font-normal">
                created_at :{" "}
                {moment(+todo.created_at).format("dddd, DD MMM YYYY HH:mm")}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoComponent;
