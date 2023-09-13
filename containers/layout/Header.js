import React from "react";
import { priorities } from "../../components/TodoForm";
import addIcon from "./../../assets/icons/add.svg";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
const Header = ({ searchedText, setSearchedText }) => {
  const { data: session, status } = useSession();
  const location = useRouter();
  return (
    <header className="z-10 p-2 w-full flex-wrap  fixed top-0 start-0 flex bg-modal_container items-center gap-5 justify-center sm:justify-between ">
      <Link legacyBehavior href="/">
        <a className="cursor-pointer     w-fit h-fit px-3 py-2 rounded-lg bg-btn_color text-[1.3rem] uppercase ">
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
      {location.pathname === "/" && (
        <input
          type="text"
          value={searchedText}
          placeholder="search ..."
          onChange={(e) => setSearchedText(e.target.value)}
          className="    flex transition-all min-w-full  lg:min-w-[500px] md:min-w-[300px] h-[50px] ps-2 rounded-lg border-[1px] outline-none focus:border-btn_color"
        />
      )}
      {session && session.user ? (
        <button
          onClick={() => signOut()}
          className=" w-fit flex gap-2 items-center justify-between h-fit rounded-lg bg-btn_color px-2 py-1 capitalize    transition-all border-[1px] border-transparent hover:border-white"
        >
          LogOut
        </button>
      ) : (
        <button
          onClick={() => signIn()}
          className="  w-fit flex gap-2 items-center justify-between h-fit rounded-lg bg-btn_color px-2 py-1 capitalize    transition-all border-[1px] border-transparent hover:border-white"
        >
          Login
        </button>
      )}
      {location.pathname === "/" && (
        <button
          onClick={() => setDisplayPopUp(true)}
          className="   w-fit flex gap-2 items-center justify-between h-fit rounded-lg bg-btn_color px-2 py-1 capitalize animate-bounce hover:animate-none transition-all border-[1px] border-transparent hover:border-white"
        >
          create new todo{" "}
          <Image src={addIcon} alt="add todo" width={25} height={25} />{" "}
        </button>
      )}
      {status === "authenticated" && (
        <div className="min-w-[100px] max-w-[220px] p-2 line-clamp-1 rounded-lg bg-btn_color flex justify-between items-center gap-2 text-[.9rem] font-bold capitalize">
          {session.user.name}
          <img
            src={session.user.image}
            className="border-btn_color border-[1px] rounded-full w-[30px] object-contain"
            alt="user image"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
