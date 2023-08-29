import React, { useState } from "react";
import { getSingleTodo } from "../api/todos/[todo_id]";
import closeIcon from "./../../assets/icons/close.svg";
import reloadIcon from "./../../assets/icons/reload.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import editIcon from "./../../assets/icons/edit.svg";
import { categories, priorities } from "../../components/TodoForm";
import moment from "moment";
import deleteIcon from "./../../assets/icons/reddelete.svg";
import axios from "axios";
import ModalComponent from "../../components/ModalComponent";
import Calendar from "react-calendar";
import dbConnect from "../../server/utils/dbConnect";
import TimePicker from "react-time-picker";
import { AnimatePresence, motion } from "framer-motion";
const SingleTodoPage = ({ todo }) => {
  const [selectedEdit, setSelectedEdit] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: todo.title,
    description: todo.description,
    category: todo.category,
    priority: todo.priority,
    deadLine: new Date(todo.deadline),
    selected_time: todo.selected_time,
    created_at: todo.created_at,
    completed: todo.completed,
  });
  const details = [
    {
      title: "created at",
      description: moment(+formData.created_at).format(
        "dddd, DD MMM YYYY HH:mm"
      ),
    },
    {
      title: "completed",
      description: formData.completed ? "yes" : "no",
    },
    {
      title: "category",
      description: formData.category,
    },
    {
      title: "priority",
      description: formData.priority,
    },
    {
      title: "deadline",
      description: moment(formData.deadLine).format("dddd, DD MMM YYYY"),
    },
    {
      title: "selected time",
      description:
        +(formData.selected_time + "").split(":")[0] > 12
          ? formData.selected_time + " PM"
          : formData.selected_time + " AM",
    },
  ];
  const deleteToDo = (id) => {
    axios
      .delete(`/api/todos/${id}`)
      .then(() => {
        router.push("/todos");
      })
      .catch((err) => {
        throw new Error({ title: err });
      });
  };
  const editTodo = async (id) => {
    await axios
      .put(`/api/todos/${id}`, formData)
      .then((res) => {
        setSelectedEdit("");
        alert(res.data.message);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="overflow-hidden relative w-full flex justify-center items-center p-2 md:p-10 gap-5 flex-col">
      <motion.div
        initial={{
          x: -100,
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 1,
        }}
        className="w-full flex justify-between md:justify-start items-center gap-2 p-2"
      >
        <button
          onClick={() => router.back()}
          className=" bg-dark_btn_color hover:bg-btn_color transition-all w-fit h-fit flex items-center justify-center p-2 rounded-lg "
        >
          <Image src={closeIcon} alt="icon" className="w-[40px] h-[40px] " />
        </button>
        <button
          onClick={() => router.reload()}
          className=" bg-dark_btn_color hover:bg-btn_color transition-all w-fit h-fit flex items-center justify-center p-2 rounded-lg "
        >
          <Image src={reloadIcon} alt="icon" className="w-[40px] h-[40px] " />
        </button>
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          type: "tween",
        }}
        className="w-full flex gap-5 p-2 justify-between md:justify-start items-start"
      >
        <button className="w-fit h-fit hover:scale-125 transition-all">
          <div
            className="w-[22px] h-[22px] rounded-full flex justify-center items-center"
            style={{ background: priorities[formData.priority - 1].color }}
          >
            <div className="w-[19px] h-[19px] rounded-full flex justify-center items-center bg-modal_container">
              <div
                className="w-[7px] h-[7px] rounded-full flex justify-center items-center"
                style={{ background: priorities[formData.priority - 1].color }}
              ></div>
            </div>
          </div>
        </button>
        <div className="w-fit flex gap-2 flex-col items-start justify-start text-start capitalize text-[.9rem] text-modal_header">
          <h1 className="font-bold">{formData.title}</h1>
          <p className="text-ligth_text">{formData.description}</p>
        </div>
        <button
          onClick={() => setSelectedEdit("title")}
          className="w-fit h-fit hover:bg-btn_color p-2 rounded-lg transition-all"
        >
          <Image
            src={editIcon}
            alt="edit"
            className="min-w-[30px] min-h-[30px]"
          />
        </button>
      </motion.div>
      <div className="w-full p-2 flex flex-col gap-5 items-start justify-start">
        {details.map((d) => {
          return (
            <div
              key={d.title}
              className="w-full p-1 flex items-center justify-between  text-modal_header capitalize text-[.9rem] md:text-[1.2rem]"
            >
              <motion.span
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                className="font-semibold"
              >
                {d.title} :
              </motion.span>
              <motion.button
                initial={{ x: 1000 }}
                animate={{ x: 0 }}
                className="bg-modal_container p-2 rounded-lg capitalize hover:bg-btn_color transition-all"
                onClick={() => setSelectedEdit(d.title)}
              >
                {d.description}
              </motion.button>
            </div>
          );
        })}
        <motion.button
          onClick={() => deleteToDo(todo._id)}
          className="text-delete_color capitalize hover:border-btn_color border-[1px] border-delete_color transition-all hover:text-btn_color rounded-lg flex items-center gap-2  md:text-[1.2rem] text-start w-fit p-2 whitespace-nowrap"
        >
          <Image
            src={deleteIcon}
            alt="delete btn"
            className="w-[25px] h-[25px]"
          />
          Delete todo
        </motion.button>
      </div>
      <AnimatePresence>
        {selectedEdit === "title" && (
          <ModalComponent
            onsubmit={() => editTodo(todo._id)}
            setValue={setSelectedEdit}
            onCancel={() => {
              setFormData({
                ...formData,
                title: todo.title,
                description: todo.description,
              });
            }}
          >
            <div className="w-full h-fit rounded-lg flex flex-col gap-3 justify-start items-start p-1">
              <label
                className="capitalize text-[1.2rem] font-bold"
                htmlFor="todo-title"
              >
                todo title
              </label>
              <input
                className="w-full h-[45px] rounded-lg border-white border-[1px] outline-none transition-all focus:border-btn_color ps-5"
                type="text"
                name="title"
                id="todo-title"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                }}
              />
            </div>
            <div className="w-full h-fit rounded-lg flex flex-col gap-3 justify-start items-start p-1">
              <label
                className="capitalize text-[1.2rem] font-bold"
                htmlFor="todo-desc"
              >
                todo description
              </label>
              <input
                className="w-full h-[45px] rounded-lg border-white border-[1px] outline-none transition-all focus:border-btn_color ps-5"
                type="text"
                name="desc"
                id="todo-desc"
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                }}
              />
            </div>{" "}
          </ModalComponent>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {" "}
        {selectedEdit === "deadline" && (
          <ModalComponent
            onsubmit={() => editTodo(todo._id)}
            setValue={setSelectedEdit}
            onCancel={() => {
              setFormData({
                ...formData,
                deadLine: todo.deadline,
              });
            }}
          >
            <div className="w-full h-fit rounded-lg flex flex-col gap-3 justify-start items-start p-1">
              <label
                className="capitalize text-[1.2rem] font-bold"
                htmlFor="todo-desc"
              >
                deadline{" "}
                <span className="w-fit h-fit px-2 py-1 border-btn_color text-btn_color rounded-lg border-[1px]">
                  {!!formData.deadLine
                    ? new Date(formData.deadLine).toLocaleDateString()
                    : "N/A"}
                </span>
              </label>
              <div className="w-full">
                <Calendar
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      deadLine: e,
                    })
                  }
                  value={formData.deadLine}
                  className="calendar"
                  minDate={new Date(Date.now())}
                />
              </div>
            </div>{" "}
          </ModalComponent>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {" "}
        {selectedEdit === "completed" && (
          <ModalComponent
            onsubmit={() => editTodo(todo._id)}
            setValue={setSelectedEdit}
            onCancel={() => {
              setFormData({
                ...formData,
                completed: todo.completed,
              });
            }}
          >
            <div className="w-fit min-h-[100px] flex flex-wrap justify-between items-center gap-5 ">
              <span className="text-modal_header capitalize font-bold">
                you completed the todo ?
              </span>
              <div className="w-fit flex items-center gap-2 justify-center ">
                <button
                  onClick={() => setFormData({ ...formData, completed: true })}
                  className={`px-2 py-1 rounded-lg capitalize transition-all ${
                    formData.completed
                      ? "bg-btn_color text-modal_header"
                      : "first-letter:border-[1px] border-transparent hover:border-btn_color hover:text-btn_color"
                  }  `}
                >
                  yes
                </button>
                <button
                  onClick={() => setFormData({ ...formData, completed: false })}
                  className={`px-2 py-1 rounded-lg capitalize transition-all  ${
                    !formData.completed
                      ? "bg-btn_color text-modal_header"
                      : "first-letter:border-[1px] border-transparent hover:border-btn_color hover:text-btn_color"
                  } `}
                >
                  no
                </button>
              </div>
            </div>
          </ModalComponent>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedEdit === "category" && (
          <ModalComponent
            onsubmit={() => editTodo(todo._id)}
            setValue={setSelectedEdit}
            onCancel={() => {
              setFormData({
                ...formData,
                category: todo.category,
              });
            }}
          >
            {" "}
            <div className="w-full h-fit rounded-lg flex flex-col gap-3 justify-start items-start p-1">
              <label
                className="capitalize text-[1.2rem] font-bold"
                htmlFor="todo-desc"
              >
                category
              </label>
              <div className="w-full h-fit flex flex-wrap items-start justify-start gap-2 p-2">
                {categories.map((c) => {
                  return (
                    <button
                      key={c}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          category: c,
                        });
                      }}
                      className={`w-fit h-fit text-[.9rem] border-[1px] ${
                        formData.category === c
                          ? "border-btn_color text-btn_color   "
                          : "bg-transparent border-white text-white"
                      }   hover:border-btn_color hover:text-btn_color capitalize px-2 py-1 rounded-lg hover:text-btnborder-btn_color transition-all`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>{" "}
          </ModalComponent>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedEdit === "priority" && (
          <ModalComponent
            onsubmit={() => editTodo(todo._id)}
            setValue={setSelectedEdit}
            onCancel={() => {
              setFormData({
                ...formData,
                priority: todo.priority,
              });
            }}
          >
            <div className="w-full h-fit rounded-lg flex flex-col gap-3 justify-start items-start p-1">
              <label
                className="capitalize text-[1.2rem] font-bold"
                htmlFor="todo-desc"
              >
                Task Priority
              </label>
              <div className="w-full h-fit flex flex-wrap items-start justify-start gap-2 p-2">
                {priorities.map((Priority) => {
                  return (
                    <button
                      key={Priority.p}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          priority: Priority.p,
                        });
                      }}
                      className={`w-[40px] h-[40px] flex justify-center items-center text-[1rem] font-semibold  ${
                        formData.priority === Priority.p
                          ? "  border-btn_color scale-110 text-white"
                          : " text-white hover:scale-105 "
                      } border-[1px] border-white  hover:border-btn_color capitalize p-2 rounded-full transition-all`}
                      style={{ background: Priority.color }}
                    >
                      {Priority.p}
                    </button>
                  );
                })}
              </div>
            </div>{" "}
          </ModalComponent>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedEdit === "selected time" && (
          <ModalComponent
            onsubmit={() => editTodo(todo._id)}
            setValue={setSelectedEdit}
            onCancel={() => {
              setFormData({
                ...formData,
                selected_time: todo.selected_time,
              });
            }}
          >
            <div className="w-full h-fit rounded-lg flex flex-col gap-3 justify-start items-start p-1">
              <label
                className="capitalize text-[1.2rem] font-bold"
                htmlFor="todo-desc"
              >
                Choose Time{" "}
                <span className="w-fit h-fit px-2 py-1 border-btn_color text-btn_color rounded-lg border-[1px]">
                  {formData.selected_time || "N/A"}
                </span>
              </label>
              <div className="w-full">
                <TimePicker
                  onChange={(e) =>
                    setFormData({ ...formData, selected_time: e })
                  }
                  value={formData.selected_time}
                />
              </div>
            </div>
          </ModalComponent>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SingleTodoPage;

export const getServerSideProps = async ({ params }) => {
  const { todo_id } = params;
  await dbConnect();
  const todo = await getSingleTodo(todo_id);
  return {
    props: {
      todo: JSON.parse(JSON.stringify(todo)),
    },
  };
};
