"use client"; // Mark this as a client component
import NProgress from "nprogress";

const useProgress = () => {
  const start = () => {
    NProgress.start();
  };

  const done = () => {
    NProgress.done();
  };

  return { start, done };
};

export default useProgress;
