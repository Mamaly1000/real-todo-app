export const modalMotion = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    trasnsition: {
      duration: 0.1,
      type: "tween",
    },
  },
};
export const modalContentMotion = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    trasnsition: {
      duration: 0.2,
      type: "tween",
    },
  },
  exit: {
    opacity: 0,
    trasnsition: {},
  },
};
export const tagMotions = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    trasnsition: {
      duration: 1,
      type: "spring",
    },
  },
  exit: {
    scale: 0,
    trasnsition: {
      duration: 1,
      type: "spring",
    },
  },
};
export const todoCardMotion = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    trasnsition: {
      duration: 0.3,
      type: "tween",
    },
  },
};
