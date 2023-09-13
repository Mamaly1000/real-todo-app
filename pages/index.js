import Image from "next/image";
import TodoComponent from "../components/Todo";
import Loading from "../components/Loading";
import { useState } from "react";
import Todo from "./../server/models/todo";
import bg_pic from "./../assets/bg-pic.jpg";
import { AnimatePresence, motion } from "framer-motion";
import dbConnect from "../server/utils/dbConnect";
import { tagMotions } from "../motions/modalMotion";
import Layout from "../containers/layout/Layout";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
const index = ({ todosData }) => {
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [todos, setTodos] = useState(todosData);
  const searchedData = todos?.filter((todo) => {
    return (
      (todo.title + "").toLowerCase().includes(searchedText.toLowerCase()) ||
      (todo.description + "")
        .toLowerCase()
        .includes(searchedText.toLowerCase()) ||
      (todo.category + "").toLowerCase().includes(searchedText.toLowerCase())
    );
  });
  if (!todosData) {
    toast.error("failed to fetch data or unauthenticated !");
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }
  return (
    <Layout
      setDisplayPopUp={setDisplayPopUp}
      searchedText={searchedText}
      setSearchedText={setSearchedText}
      displayPopUp={displayPopUp}
      setTodos={setTodos}
    >
      <div className="relative w-full min-h-screen p-2 md:p-10 flex flex-col justify-center items-center gap-10 ">
        <div className="min-w-full min-h-[300px] md:min-h-[500px] flex justify-center items-end max-h-[500px] overflow-hidden  fixed top-0 start-0 -z-10">
          <Image
            src={bg_pic}
            alt="bg-pic"
            className="w-full md:min-w-[1000px] h-[300px] md:h-[650px]  object-fill"
          />
        </div>
        <AnimatePresence>
          {searchedData &&
            searchedData
              .sort((a, b) => {
                return a.priority < b.priority ? -1 : 1;
              })
              .filter((todo) => todo.completed === true).length > 0 && (
              <motion.h3
                variants={tagMotions}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="px-3 py-2 rounded-lg capitalize bg-modal_container text-modal_header font-semibold"
              >
                completed todos
              </motion.h3>
            )}
        </AnimatePresence>
        <div className="w-full flex items-start justify-center flex-wrap gap-5  ">
          {searchedData &&
            searchedData
              .sort((a, b) => {
                return a.priority < b.priority ? -1 : 1;
              })
              .filter((todo) => todo.completed === true)
              .map((todo) => {
                return (
                  <TodoComponent
                    setTodos={setTodos}
                    todo={todo}
                    key={todo._id}
                  />
                );
              })}
        </div>
        <AnimatePresence>
          {searchedData &&
            searchedData
              .sort((a, b) => {
                return a.priority < b.priority ? -1 : 1;
              })
              .filter((todo) => todo.completed === false).length > 0 && (
              <motion.h3
                variants={tagMotions}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="px-3 py-2 rounded-lg capitalize bg-modal_container text-modal_header font-semibold"
              >
                unCompleted todos
              </motion.h3>
            )}
        </AnimatePresence>
        <div className="w-full flex items-start justify-center flex-wrap gap-5  ">
          {searchedData &&
            searchedData
              .sort((a, b) => {
                return a.priority < b.priority ? -1 : 1;
              })
              .filter((todo) => todo.completed === false)
              .map((todo) => {
                return (
                  <TodoComponent
                    setTodos={setTodos}
                    todo={todo}
                    key={todo._id}
                  />
                );
              })}
        </div>
      </div>
    </Layout>
  );
};

export default index;

export const getServerSideProps = async (ctx) => {
  await dbConnect();
  const session = await getSession(ctx);
  const todos = await Todo.find({ userID: session.user.id });
  if (!session) {
    toast.error("you did not authenticated !");
    return {
      redirect: {
        destination: "/api/auth/signin?callbackUrl=http://localhost:3000/",
        permanent: false,
      },
    };
  }
  toast.success(`wellcome to your app ${session.user.name}`, {
    icon: session.user.image,
  });
  return {
    props: {
      todosData: JSON.parse(JSON.stringify(todos)),
      sessionData: session,
    },
  };
};
