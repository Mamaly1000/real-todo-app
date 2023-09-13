import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import TodoForm from "../../components/TodoForm";
import axios from "axios";

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
        alert(res.data.message);
      })
      .catch((err) => {
        console.log("failed to add todo !" + err);
      });
  };
  return (
    <div className="min-h-[1000px] relative pb-[150px] pt-[200px] sm:pt-[150px] md:pt-[50px] flex justify-start items-start flex-col gap-10 p-0 overflow-hidden  ">
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
    </div>
  );
};

export default Layout;
