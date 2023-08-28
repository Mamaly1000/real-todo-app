import { useState } from "react";
import Calendar from "react-calendar";
import TimePicker from "react-time-picker";
export const priorities = [
  {
    p: 1,
    color: " linear-gradient(to top, #ff0844 0%, #ffb199 100%) ",
  },
  {
    p: 2,
    color: " linear-gradient(to right, #f83600 0%, #f9d423 100%) ",
  },
  {
    p: 3,
    color: " linear-gradient(to top, #5f72bd 0%, #9b23ea 100%) ",
  },
  {
    p: 4,
    color: " linear-gradient(to top, #09203f 0%, #537895 100%) ",
  },
  {
    p: 5,
    color:
      "   linear-gradient(to right, #3ab5b0 0%, #3d99be 31%, #56317a 100%)  ",
  },
];
export const categories = [
  "grocery",
  "work",
  "sport",
  "design",
  "university",
  "social",
  "music",
  "health",
  "movie",
  "home",
];
const TodoForm = ({ title, onAdd, setShow }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: 0,
    deadLine: "",
    selected_time: "",
  });
  return (
    <div className="w-full h-full fixed overflow-auto start-0 top-0 flex justify-center items-center  z-10  ">
      <div
        className="fixed top-0 start-0 w-full min-h-full z-10"
        style={{ background: "rgba(0 0 0 /.9)" }}
        onClick={() => setShow(false)}
      ></div>
      <div className="w-[90%] absolute md:w-[500px] h-fit z-20 rounded-lg drop-shadow-2xl   top-10 flex flex-col gap-5 justify-center items-center bg-modal_container text-modal_copyright border-[1px] border-white hover:border-btn_color  p-2 md:p-10 mx-auto">
        <h1 className="w-full capitalize text-[1.3rem] text-start font-bold text-modal_header">
          {title}
        </h1>
        <div className="w-full flex gap-5 flex-col justify-start items-start">
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
                onChange={(e) => setFormData({ ...formData, selected_time: e })}
                value={formData.selected_time}
              />
            </div>
          </div>
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
        </div>
        <div className="capitalize text-[1rem] w-full h-fit flex  md:flex-row gap-4 justify-center items-center ">
          <button
            onClick={(e) => {
              onAdd(e, formData);
            }}
            className="min-w-[100px] w-fit h-fit px-3 py-2 rounded-lg bg-btn_color text-modal_header border-[1px] border-transparent hover:border-white disabled:opacity-50 transition-all hover:scale-110"
            disabled={
              formData.title.length === 0 ||
              formData.description.length === 0 ||
              formData.category.length === 0 ||
              formData.selected_time === "" ||
              formData.priority === 0 ||
              formData.deadLine === ""
            }
          >
            Save
          </button>
          <button
            onClick={() => setShow(false)}
            className="w-fit h-fit px-3 py-2 rounded-lg hover:scale-110 bg-transparent border-[1px] border-transparent hover:border-btn_color text-modal_header hover:text-btn_color  transition-all"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
