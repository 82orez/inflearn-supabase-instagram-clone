"use client";

import { getRandomImage } from "@/utils/random";

interface Person {
  index: number;
  userId: string;
  name: string;
  onlineAt: string;
  isActive: boolean;
  onChatScreen: boolean;
  onClick: null;
}

export default function Person({ index, userId, name, onlineAt, isActive, onChatScreen, onClick }: Person) {
  console.log({ index, userId, name, onlineAt, isActive, onChatScreen, onClick });

  return (
    <div
      className={`p-4 flex justify-center items-center gap-3 ${
        !onChatScreen && isActive && "bg-light-blue-50"
      } ${!onChatScreen && !isActive && "bg-gray-300"} ${onChatScreen && "bg-gray-50"}`}>
      <img src={getRandomImage(index)} alt={name} className={"w-16 h-16 rounded-full"} />
      <div>
        <div className="text-black font-bold text-lg">{name}</div>
        <div className="text-gray-500 text-sm">{onlineAt}</div>
      </div>
    </div>
  );
}
