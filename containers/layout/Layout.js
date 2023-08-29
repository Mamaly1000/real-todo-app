import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({
  children,
  setDisplayPopUp,
  searchedText,
  setSearchedText,
}) => {
  return (
    <div className="min-h-[1000px] relative pb-[150px] pt-[200px] sm:pt-[150px] md:pt-[50px] flex justify-start items-start flex-col gap-10 p-0 overflow-hidden  ">
      <Header
        setDisplayPopUp={setDisplayPopUp}
        searchedText={searchedText}
        setSearchedText={setSearchedText}
      />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
