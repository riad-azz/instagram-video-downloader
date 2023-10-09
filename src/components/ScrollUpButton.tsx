"use client";
import React from "react";

import { ImArrowUp } from "react-icons/im";
import { cn } from "@/utils";

const ScrollUpButton = () => {
  const [visible, setVisible] = React.useState(false);
  const windowRef = React.useRef<Window | null>(null);
  React.useEffect(() => {
    windowRef.current = window;
    window.addEventListener("scroll", toggleVisible);
  }, []);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 200) {
      setVisible(true);
    } else if (scrolled <= 200) {
      setVisible(false);
    }
  };

  return (
    <button
      onClick={() =>
        windowRef.current?.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        })
      }
      className={cn("fixed bottom-4 right-4 rounded-full bg-green-500 p-3", {
        hidden: !visible,
      })}
    >
      <ImArrowUp className="text-xl text-white" />
    </button>
  );
};

export default ScrollUpButton;
