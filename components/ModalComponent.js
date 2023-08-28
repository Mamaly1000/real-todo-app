import React from "react";

const ModalComponent = ({ children, setValue, onsubmit, onCancel }) => {
  return (
    <div className="fixed z-20 top-0 start-0 w-full h-full flex justify-center items-center ">
      <div
        className="min-w-full min-h-full absolute top-0 start-0  z-10"
        style={{ background: "rgba(0 0 0/.6)" }}
        onClick={() => setValue("")}
      ></div>
      <div className="w-[90%] md:w-fit p-2 rounded-lg drop-shadow-2xl bg-modal_container  absolute z-20 h-fit">
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
      </div>
    </div>
  );
};

export default ModalComponent;
