import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import Error from "next/error";
import { priorities } from "./TodoForm";
import moment from "moment/moment";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { todoCardMotion } from "../motions/modalMotion";
import {
  clockIcon,
  deleteIcon,
  editIcon,
  priorityIcon,
  tickIcon,
  todo_detailIcon,
} from "../assets/icons";
import { toast } from "react-toastify";
const TodoComponent = ({ todo, setTodos }) => {
  const [clicked, setCicked] = useState(false);
  const deleteToDo = async (id) => {
    await axios
      .delete(`/api/todos/${id}`)
      .then((res) => {
        setTodos(res.data.todos);
        toast.success(res.data.message);
      })
      .catch((err) => {
        throw new Error({ title: err });
      });
  };
  const completeHandler = async (id) => {
    await axios
      .put(`/api/todos/completed/${id}`, { userID: todo.userID })
      .then((res) => {
        setTodos(res.data.todos);
        toast.success(res.data.message);
      })
      .catch((err) => console.log(err));
  };
  return (
    <AnimatePresence>
      <motion.div
        variants={todoCardMotion}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        className="min-w-[90%] min-h-[50px] md:min-w-[330px] max-w-[330px] rounded-lg flex flex-col items-start overflow-hidden capitalize font-bold transition-all  "
      >
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
            <Image
              alt="info"
              src={todo_detailIcon}
              className="w-[20px] h-[20px] "
            />
          </button>
        </div>
        <div className="w-full min-w-[150px] p-2 flex flex-wrap items-start justify-start gap-2 bg-modal_container">
          <div className=" w-full py-2 flex justify-start items-center gap-2 border-b-[1px] border-modal_copyright">
            {todo.completed ? (
              <div
                className=" cursor-pointer w-[20px] h-[20px] rounded-full flex justify-center items-center"
                style={{ background: priorities[todo.priority - 1].color }}
                onClick={() =>
                  toast.promise(completeHandler(todo._id), {
                    error: `failed to fetch data`,
                    pending: `fetching data`,
                  })
                }
              >
                <div className="w-[17px] h-[17px] rounded-full flex justify-center items-center bg-modal_container">
                  <div
                    className="w-[5px] h-[5px] rounded-full flex justify-center items-center"
                    style={{ background: priorities[todo.priority - 1].color }}
                  ></div>
                </div>
              </div>
            ) : (
              <div
                onClick={() =>
                  toast.promise(completeHandler(todo._id), {
                    error: `failed to fetch data`,
                    pending: `fetching data`,
                  })
                }
                className="w-[20px] h-[20px] border-[1px] border-btn_color rounded-full flex justify-center items-center cursor-pointer"
              ></div>
            )}
            <span
              onClick={() => {
                setCicked((prev) => !prev);
              }}
              className=" line-clamp-1 w-full sm:w-1/3 md:w-fit"
            >
              {todo.title}
            </span>
            {todo.completed && (
              <span className="bg-green-900 capitalize px-2 py-1 rounded-lg">
                completed
              </span>
            )}
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
                src={clockIcon}
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
                  onClick={() =>
                    toast.promise(deleteToDo(todo._id), {
                      error: `could not delete ${todo.title} todo`,
                      pending: `deleting ${todo.title} todo`,
                    })
                  }
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
                <button
                  onClick={() =>
                    toast.promise(completeHandler(todo._id), {
                      error: `failed to fetch data`,
                      pending: `fetching data`,
                    })
                  }
                  className="w-fit h-fit rounded-lg  border-[1px] border-btn_color hover:border-white transition-all bg-btn_color capitalize flex items-center gap-2 px-2 py-1"
                >
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
      </motion.div>
    </AnimatePresence>
  );
};

export default TodoComponent;
