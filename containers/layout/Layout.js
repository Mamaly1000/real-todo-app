import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import TodoForm from "../../components/TodoForm";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Layout = ({
  setTodos,
  displayPopUp,
  setDisplayPopUp,
  children,
  searchedText,
  setSearchedText,
}) => {
  const addTodo = async (e, data) => {
    e.preventDefault();
    await axios
      .post(`/api/todos`, data)
      .then((res) => {
        setTodos(res.data.todos);
        setDisplayPopUp(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log("failed to add todo !" + err);
      });
  };
  return (
    <div className="min-h-screen  relative pb-0  pt-[320px] sm:pt-[150px] md:pt-[50px] flex justify-between items-start flex-col gap-10 p-0 overflow-hidden  ">
      <Header
        setDisplayPopUp={setDisplayPopUp}
        searchedText={searchedText}
        setSearchedText={setSearchedText}
      />
      {children}
      <Footer />
      {displayPopUp && (
        <TodoForm
          setShow={setDisplayPopUp}
          title={"create new todo"}
          onAdd={addTodo}
        />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Layout;
