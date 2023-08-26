import { useState } from "react";
import Calendar from "react-calendar";
const TodoForm = ({ title, onAdd, setShow }) => {
  const categories = [
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
  const [deadlineDate, setDeadlineDate] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });
  return (
    <div className="w-full h-full fixed overflow-auto start-0 top-0 flex justify-center items-start z-10 py-[100px]">
      <div
        className="fixed top-0 start-0 w-full min-h-full z-10"
        style={{ background: "rgba(0 0 0 /.9)" }}
        onClick={() => setShow(false)}
      ></div>
      <div className="w-[90%] md:w-[500px] h-fit z-20 rounded-lg drop-shadow-2xl flex flex-col gap-5 justify-center items-center bg-transparent border-[1px] border-white hover:border-violet-600 p-10">
        <h1 className="w-full capitalize text-[2rem] text-center text-violet-600">
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
              className="w-full h-[45px] rounded-lg border-white border-[1px] outline-none transition-all focus:border-violet-600 ps-5"
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
              className="w-full h-[45px] rounded-lg border-white border-[1px] outline-none transition-all focus:border-violet-600 ps-5"
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
                    className={`w-fit h-fit text-[.9rem]  ${
                      formData.category === c
                        ? "bg-violet-600 hover:text-white"
                        : "bg-transparent text-white"
                    } border-[1px] border-white hover:border-violet-600 capitalize px-2 py-1 rounded-lg hover:text-violet-600 transition-all`}
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
              deadline {new Date(deadlineDate).toLocaleDateString()}
            </label>
            <div className="w-full" >
              <Calendar
                onChange={setDeadlineDate}
                value={deadlineDate}
                className="calendar"
                minDate={new Date(Date.now())}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col md:flex-row gap-4 justify-center items-center ">
          <button
            onClick={(e) => {
              onAdd(e, formData);
            }}
            className="w-fit h-fit px-2 py-1 rounded-lg bg-violet-600 capitalize text-[1.2rem] border-[1px] border-transparent hover:border-white disabled:opacity-50 transition-all"
            disabled={
              formData.title.length === 0 ||
              formData.description.length === 0 ||
              formData.category.length === 0
            }
          >
            add todo
          </button>
          <button
            onClick={() => setShow(false)}
            className="w-fit h-fit px-2 py-1 rounded-lg bg-gray-800 capitalize text-[1.2rem] border-[1px] border-transparent hover:border-white disabled:opacity-50 transition-all"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
