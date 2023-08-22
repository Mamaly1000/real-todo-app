import addIcon from "./../../assets/icons/add.svg";
import Link from "next/link";
import Image from "next/image";
import Todo from "../../components/Todo";
import useSWR from "swr";
import axios from "axios";
import Loading from "./../../components/Loading";
import { useState } from "react";
const index = () => {
  const [todos, setTodos] = useState([]);
  const { data, error, isLoading } = useSWR(
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

  if (isLoading || error) {
    return <Loading />;
  }
  return (
    <div className="w-full p-10 flex flex-col justify-center items-center gap-10 ">
      <div className="w-full flex justify-between items-center gap-5 flex-col md:flex-row">
        <input
          type="text"
          value=""
          onChange={(e) => {}}
          className="transition-all min-w-full  lg:min-w-[500px] md:min-w-[300px] h-[50px] ps-2 rounded-lg border-[1px] outline-none focus:border-violet-600"
        />
        <Link legacyBehavior href="/create-note">
          <a className="w-fit flex gap-2 items-center justify-between h-fit rounded-lg bg-violet-600 px-2 py-1 capitalize shadow-md shadow-violet-400 hover:shadow-none transition-all border-[1px] border-transparent hover:border-white">
            create new todo{" "}
            <Image src={addIcon} alt="add todo" width={25} height={25} />{" "}
          </a>
        </Link>
      </div>
      <div className="w-full flex items-center justify-center gap-5 flex-col ">
        {todos.map((todo) => {
          return <Todo setTodos={setTodos} todo={todo} key={todo.id} />;
        })}
      </div>
    </div>
  );
};

export default index;
