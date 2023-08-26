import addIcon from "./../../assets/icons/add.svg";
import Image from "next/image";
import Todo from "../../components/Todo";
import useSWR from "swr";
import axios from "axios";
import Loading from "./../../components/Loading";
import { useMemo, useState } from "react";
import TodoForm from "../../components/TodoForm";
const index = () => {
  const [searchedText, setSearchedText] = useState("");
  const [todos, setTodos] = useState([]);
  const { error, isLoading } = useSWR(
    "fetch-todos",
    () => {
      return axios.get("/api/todos");
    },
    {
      onError: () => {
        throw new Error("could'nt fetch todos");
      },
      onSuccess: (data) => {
        setTodos(data.data.todos);
      },
    }
  );
  const [displayPopUp, setDisplayPopUp] = useState(false);
  if (isLoading || error) {
    return <Loading />;
  }
  const addTodo = async (e, data) => {
    e.preventDefault();
    await axios
      .post(`/api/todos`, data)
      .then((res) => {
        setTodos(res.data.todos);
        setDisplayPopUp(false);
        alert(res.data.message);
      })
      .catch((err) => {
        console.log("failed to add todo !" + err);
      });
  };
  const searchedData = todos.filter((todo) => {
    return (
      (todo.title + "").toLowerCase().includes(searchedText.toLowerCase()) ||
      (todo.description + "")
        .toLowerCase()
        .includes(searchedText.toLowerCase()) ||
      (todo.category + "").toLowerCase().includes(searchedText.toLowerCase())
    );
  });
  return (
    <div className="relative w-full p-10 flex flex-col justify-center items-center gap-10 ">
      <div className="w-full flex justify-between items-center gap-5 flex-col md:flex-row">
        <input
          type="text"
          value={searchedText}
          placeholder="search ..."
          onChange={(e) => setSearchedText(e.target.value)}
          className="transition-all min-w-full  lg:min-w-[500px] md:min-w-[300px] h-[50px] ps-2 rounded-lg border-[1px] outline-none focus:border-violet-600"
        />
        <button
          onClick={() => setDisplayPopUp(true)}
          className="w-fit flex gap-2 items-center justify-between h-fit rounded-lg bg-violet-600 px-2 py-1 capitalize shadow-md shadow-violet-400 hover:shadow-none transition-all border-[1px] border-transparent hover:border-white"
        >
          create new todo{" "}
          <Image src={addIcon} alt="add todo" width={25} height={25} />{" "}
        </button>
      </div>
      <div className="w-full flex items-center justify-center gap-5 flex-col ">
        {searchedData.map((todo) => {
          return <Todo setTodos={setTodos} todo={todo} key={todo.id} />;
        })}
      </div>
      {displayPopUp && (
        <TodoForm
          setShow={setDisplayPopUp}
          title={"create new todo"}
          onAdd={addTodo}
        />
      )}
    </div>
  );
};

export default index;
