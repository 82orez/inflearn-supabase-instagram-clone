"use client";

import { getRandomImage } from "@/utils/random";
import TimeAgo from "javascript-time-ago";
import ko from "javascript-time-ago/locale/ko";

TimeAgo.addDefaultLocale(ko);
const timeAgo = new TimeAgo("ko-KR");

interface Person {
  index: number;
  userId: string;
  name: string;
  onlineAt: string;
  isActive: boolean;
  onChatScreen: boolean;
  onClick: () => void;
}

export default function Person({ index, userId, name, onlineAt, isActive, onChatScreen, onClick }: Person) {
  return (
    <div
      className={`p-4 min-w-60 flex items-center gap-3 ${onClick && "cursor-pointer"} ${
        !onChatScreen && isActive && "bg-light-blue-50"
      } ${!onChatScreen && !isActive && "bg-gray-300"} ${onChatScreen && "bg-gray-300"}`}
      onClick={onClick}>
      <img src={getRandomImage(index)} alt={name} className={"w-16 h-16 rounded-full"} />
      <div>
        <div className="text-black font-bold text-lg">{name}</div>
        <div className="text-gray-500 text-sm">{onlineAt && timeAgo.format(Date.parse(onlineAt))}</div>
      </div>
    </div>
  );
}
