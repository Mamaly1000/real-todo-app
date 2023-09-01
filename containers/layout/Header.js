import React from "react";
import { priorities } from "../../components/TodoForm";
import addIcon from "./../../assets/icons/add.svg";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
const Header = ({ setDisplayPopUp, searchedText, setSearchedText }) => {
  const { data: session } = useSession();
  return (
    <header className="z-10 p-2 w-full flex-wrap  fixed top-0 start-0 flex bg-modal_container items-center gap-5 justify-center sm:justify-between ">
      <Link legacyBehavior href="/">
        <a className="cursor-pointer order-1   w-fit h-fit px-3 py-2 rounded-lg bg-btn_color text-[1.3rem] uppercase ">
          task{" "}
          <span
            style={{ background: priorities[0].color }}
            className="rounded-s-lg px-1"
          >
            M
          </span>
          <span style={{ background: priorities[1].color }} className="px-1">
            A
          </span>
          <span style={{ background: priorities[2].color }} className="px-1">
            S
          </span>
          <span style={{ background: priorities[3].color }} className="px-1">
            T
          </span>
          <span style={{ background: priorities[4].color }} className="px-1">
            E
          </span>
          <span
            style={{ background: priorities[2].color }}
            className="rounded-e-lg px-1"
          >
            R
          </span>
        </a>
      </Link>
      <input
        type="text"
        value={searchedText}
        placeholder="search ..."
        onChange={(e) => setSearchedText(e.target.value)}
        className="order-3 md:order-2 flex transition-all min-w-full  lg:min-w-[500px] md:min-w-[300px] h-[50px] ps-2 rounded-lg border-[1px] outline-none focus:border-btn_color"
      />
      {session && session.user ? (
        <button
          onClick={() => signOut()}
          className="order-2 md:order-3 w-fit flex gap-2 items-center justify-between h-fit rounded-lg bg-btn_color px-2 py-1 capitalize    transition-all border-[1px] border-transparent hover:border-white"
        >
          LogOut
        </button>
      ) : (
        <button
          onClick={() => signIn()}
          className="order-2 md:order-3 w-fit flex gap-2 items-center justify-between h-fit rounded-lg bg-btn_color px-2 py-1 capitalize    transition-all border-[1px] border-transparent hover:border-white"
        >
          Login
        </button>
      )}
      {/* <button className="order-2 md:order-3 w-fit flex gap-2 items-center justify-between h-fit rounded-lg bg-modal_container px-2 py-1 capitalize    transition-all border-[1px] border-transparent hover:border-white">
        register
      </button>{" "} */}
      <Link legacyBehavior href="/profile">
        <a className="order-2 md:order-3 w-fit flex gap-2 items-center justify-between h-fit rounded-lg bg-modal_container px-2 py-1 capitalize    transition-all border-[1px] border-transparent hover:border-white">
          profile
        </a>
      </Link>
      <button
        onClick={() => setDisplayPopUp(true)}
        className="order-2 md:order-3 w-fit flex gap-2 items-center justify-between h-fit rounded-lg bg-btn_color px-2 py-1 capitalize    transition-all border-[1px] border-transparent hover:border-white"
      >
        create new todo{" "}
        <Image src={addIcon} alt="add todo" width={25} height={25} />{" "}
      </button>
    </header>
  );
};

export default Header;
