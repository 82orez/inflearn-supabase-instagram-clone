"use client";
import React from "react";
import { atom, useRecoilState } from "recoil";

const activeDivState = atom<number | null>({
  key: "activeDivState",
  default: null,
});

export default function Example() {
  const [activeDiv, setActiveDiv] = useRecoilState(activeDivState);

  const handleClick = (index: number) => {
    setActiveDiv(index);
  };

  return (
    <div>
      {["div1", "div2", "div3"].map((text, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className={`cursor-pointer p-4 ${activeDiv === index ? "text-red-500" : "text-gray-500"}`}>
          {text}
        </div>
      ))}
    </div>
  );
}
