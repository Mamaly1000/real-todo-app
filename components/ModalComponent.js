import React from "react";
import { motion } from "framer-motion";
import { modalContentMotion, modalMotion } from "../motions/modalMotion";
const ModalComponent = ({ children, setValue, onsubmit, onCancel }) => {
  return (
    <motion.div className="fixed z-20 top-0 start-0 w-full h-full flex justify-center items-center ">
      <motion.div
        variants={modalMotion}
        initial="hidden"
        animate="visible"
        className="min-w-full min-h-full absolute top-0 start-0  z-10"
        style={{ background: "rgba(0 0 0/.6)" }}
        onClick={() => setValue("")}
      ></motion.div>
      <motion.div
        variants={modalContentMotion}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-[90%] md:w-fit p-2 rounded-lg drop-shadow-2xl bg-modal_container  absolute z-20 h-fit"
      >
        {children}
        <div className="min-w-[100px] flex items-center justify-between gap-2 p-2">
          <button
            className="px-3 py-2 rounded-lg bg-btn_color capitalize"
            onClick={onsubmit}
          >
            apply changes
          </button>
          <button
            className="px-3 py-2 transition-all rounded-lg border-[1px] border-transparent hover:border-btn_color hover:text-btn_color capitalize"
            onClick={() => {
              onCancel();
              setValue("");
            }}
          >
            cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModalComponent;
